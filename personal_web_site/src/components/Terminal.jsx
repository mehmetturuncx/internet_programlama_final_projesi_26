import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal } from 'react-icons/fa';
import './Terminal.css';

const Terminal = ({ onClose }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Dijital-Botanik OS v2.0 Başlatıldı...' },
    { type: 'system', content: 'Komutları görmek için "help" yazabilirsiniz.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === '') return;

    let response = null;

    switch (trimmed) {
      case 'help':
        response = (
          <div>
            Kullanılabilir komutlar:
            <br />&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;- Bu mesajı gösterir
            <br />&nbsp;&nbsp;whoami&nbsp;&nbsp;- Benim hakkımda kısa bilgi
            <br />&nbsp;&nbsp;github&nbsp;&nbsp;- Favori projelerimi ve GitHub linkimi gösterir
            <br />&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;- Terminal ekranını temizler
          </div>
        );
        break;
      case 'whoami':
        response = 'Merhaba, ben Mehmet. İnternet Programlama Final Projesi için geliştirdiğim bu interaktif odaya hoş geldin!';
        break;
      case 'github':
        setHistory((prev) => [
          ...prev,
          { type: 'input', content: `guest@dijital-oda:~$ ${cmd}` },
          { type: 'system', content: 'Projeler GitHub\'dan çekiliyor...' }
        ]);

        fetch('https://api.github.com/users/mehmetturuncx/repos?sort=updated&per_page=20')
          .then(res => {
            if (!res.ok) throw new Error('API Hatası');
            return res.json();
          })
          .then(data => {
            const projectsList = data.map(repo => `> ${repo.name}`).join('\n');
            setHistory((prev) => [
              ...prev,
              { type: 'output', content: (
                <div>
                  Projelerim:
                  <pre className="terminal-pre">{projectsList}</pre>
                  Tüm projelerimi detaylı incelemek için: <a href="https://github.com/mehmetturuncx" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/mehmetturuncx</a>
                </div>
              )}
            ]);
          })
          .catch(() => {
            setHistory((prev) => [
              ...prev,
              { type: 'output', content: 'Projeler çekilirken bir hata oluştu. Lütfen github.com/mehmetturuncx adresine gidin.' }
            ]);
          });
        return; 
      case 'clear':
        setHistory([]);
        return;
      default:
        response = `Komut bulunamadı: ${trimmed}. "help" yazarak geçerli komutları görebilirsiniz.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', content: `guest@dijital-oda:~$ ${cmd}` },
      { type: 'output', content: response }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window tv-effect" onClick={(e) => { e.stopPropagation(); document.getElementById('terminal-input').focus(); }}>
        <div className="terminal-header">
          <h2 className="terminal-title">
            <FaTerminal className="terminal-icon" />
            user@dijital-oda: ~
          </h2>
          <button className="terminal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="terminal-body">
          {history.map((line, index) => (
            <div key={index} className={`terminal-line ${line.type}`}>
              {line.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        
        <div className="terminal-input-line">
          <span className="prompt">guest@dijital-oda:~$</span>
          
          <div className="input-wrapper">
            <input
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
            <div className="fake-cursor-container" aria-hidden="true">
              <span className="invisible-text">{input}</span>
              <span className="block-cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
