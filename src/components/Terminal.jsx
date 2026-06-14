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
    const parts = cmd.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return;

    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    let response = null;

    switch (command) {
      case 'help':
        response = (
          <div>
            Kullanılabilir komutlar:
            <br />&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;- Bu mesajı gösterir
            <br />&nbsp;&nbsp;ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Dosyaları listeler
            <br />&nbsp;&nbsp;cat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Dosya içeriğini okur (Örn: cat projects)
            <br />&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;- Terminal ekranını temizler
          </div>
        );
        break;
      case 'ls':
        response = (
          <div style={{ color: 'var(--accent)' }}>
            about_me&nbsp;&nbsp;&nbsp;about_this_project&nbsp;&nbsp;&nbsp;projects
          </div>
        );
        break;
      case 'cat':
        if (args.length === 0) {
          response = 'cat: dosya adı belirtilmeli';
        } else if (args[0] === 'projects') {
          response = (
            <div>
              <pre className="terminal-pre" style={{ fontFamily: "'VT323', monospace", margin: 0, whiteSpace: 'pre-wrap' }}>
{`> hackathon_26
  Bir hackathon kapsamında geliştirilen, takım içi yenilikçi bir yazılım projesi çözümü.
> episodd
  Dizi ve bölümleri takip etmek için geliştirilmiş, kullanıcı dostu bir arayüze sahip takip uygulaması.
> rebin cli
  Terminal üzerinden çalışarak geliştirici süreçlerini hızlandıran komut satırı aracı (CLI).`}
              </pre>
            </div>
          );
        } else if (args[0] === 'about_me') {
          response = "Her gün saat 8.00-8.30 arası uyanırım. En sevdiğim müzik türü alternatif rock'dır. Çıkmış Call of Duty oyunlarının %85'ini bitirdim. En sevdiğim 3 dizi: Game of Thrones, Dexter, Better Call Saul.";
        } else if (args[0] === 'about_this_project') {
          response = "Ücretsiz bir wallpaper bulup etklişeme geçilmesini istediğim nesneleri tek tek photoshop ile kırptım. Her nesne için farklı bir özellik (bilgisayar için terminal gibi) buldum. React ve Vite kullanarak projeyi oluşturdum. Yapay zeka yardımı için Antigravity CLI üzerinden Gemini 3.1 Pro ve Claude Opus 4.6 kullandım.";
        } else {
          response = `cat: ${args[0]}: Böyle bir dosya ya da dizin yok`;
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        response = `Komut bulunamadı: ${command}. "help" yazarak geçerli komutları görebilirsiniz.`;
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
