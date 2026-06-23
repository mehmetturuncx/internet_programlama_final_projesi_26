import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal } from 'react-icons/fa';
import './Terminal.css';
import SnakeGame from './SnakeGame';

const FILES = ['facts_about_me', 'about_this_project', 'projects'];
const COMMANDS = ['help', 'ls', 'cat', 'clear', 'play', 'sudo'];

const Terminal = ({ onClose, onUnlockAchievement, crashed, onCrash }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Dijital Oda OS v2.0 Başlatıldı...' },
    { type: 'system', content: 'Komutları görmek için "help" yazabilirsiniz.' }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [awaitingSudo, setAwaitingSudo] = useState(false);
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isPlayingSnake]);

  useEffect(() => {
    const handleKey = (e) => {
      // Sadece oyun oynanmıyorsa Escape ile kapat
      if (e.key === 'Escape' && !isPlayingSnake) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, isPlayingSnake]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    if (awaitingSudo) {
      if (trimmedCmd.toLowerCase() === 'evet') {
        onCrash();
        onUnlockAchievement('crash');
        return;
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'input', content: `guest@dijital-oda:~$ ${cmd}` },
          { type: 'output', content: 'İşlem iptal edildi.' }
        ]);
        setAwaitingSudo(false);
        return;
      }
    }

    const parts = trimmedCmd.split(' ').filter(Boolean);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    let response = null;

    if (command === 'sudo' && args.join(' ') === 'rm -rf /') {
      setHistory((prev) => [
        ...prev,
        { type: 'input', content: `guest@dijital-oda:~$ ${cmd}` },
        { type: 'system', content: 'UYARI: Tüm sistemi silmek üzeresiniz. Emin misiniz? (evet/hayır)' }
      ]);
      setAwaitingSudo(true);
      return;
    }

    switch (command) {
      case 'help':
        response = (
          <div>
            Kullanılabilir komutlar:
            <br />&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bu mesajı gösterir
            <br />&nbsp;&nbsp;ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Dosyaları listeler
            <br />&nbsp;&nbsp;cat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Dosya içeriğini okur (Örn: cat projects)
            <br />&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Terminal ekranını temizler
            <br />&nbsp;&nbsp;play snake&nbsp;&nbsp;- Yılan oyunu oynatır
          </div>
        );
        break;
      case 'ls':
        response = (
          <div style={{ color: 'var(--accent)' }}>
            facts_about_me&nbsp;&nbsp;&nbsp;about_this_project&nbsp;&nbsp;&nbsp;projects
          </div>
        );
        break;
      case 'play':
        if (args[0] === 'snake') {
          setIsPlayingSnake(true);
          onUnlockAchievement('snake');
          return;
        } else {
          response = 'Böyle bir oyun bulunamadı. "play snake" deneyin.';
        }
        break;
      case 'cat':
        if (args.length === 0) {
          response = 'cat: dosya adı belirtilmeli';
        } else if (args[0] === 'projects') {
          response = (
            <div>
              <pre className="terminal-pre" style={{ fontFamily: "'VT323', monospace", margin: 0, whiteSpace: 'pre-wrap' }}>
{`> hackathon_26
  HSD ve trex tarafından Bursa Uludağ Üniversitesi'nde yapılan ve bize 4.lük getiren projemiz.
> episodd
  Dizi ve bölümleri takip etmek için geliştirilmiş, kullanıcı dostu bir arayüze sahip takip uygulaması.
> rebin_cli
  Terminal üzerinde çalışan multi-platform bir çöp kutusu uygulaması.
> internet_programlama_final_projesi_26
  Retro tarzda interaktif bir dijital oda portfolyo projesi. React ve Vite kullanılarak geliştirildi.`}
              </pre>
            </div>
          );
        } else if (args[0] === 'facts_about_me') {
          response = (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Her gün saat 8.00-8.30 arası uyanırım.</li>
              <li>En sevdiğim müzik türü alternatif rock'dır.</li>
              <li>Çıkmış Call of Duty oyunlarının %85'ini bitirdim.</li>
              <li>En sevdiğim 3 dizi: Game of Thrones, Dexter, Better Call Saul.</li>
            </ul>
          );
        } else if (args[0] === 'about_this_project') {
          response = "Ücretsiz bir wallpaper bulup etkileşime geçilmesini istediğim nesneleri tek tek photoshop ile kırptım. Her nesne için farklı bir özellik (bilgisayar için terminal gibi) buldum. React ve Vite kullanarak projeyi oluşturdum. Yapay zeka yardımı için Antigravity CLI üzerinden Gemini 3.1 Pro ve Claude Opus 4.6 kullandım.";
        } else {
          response = `cat: ${args[0]}: Böyle bir dosya ya da dizin yok`;
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
        response = 'sudo: bu komut için yetkiniz yok veya yanlış kullanım.';
        break;
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
      if (input.trim() && !awaitingSudo) {
        setCommandHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
      }
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp' && !awaitingSudo) {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown' && !awaitingSudo) {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab' && !awaitingSudo) {
      e.preventDefault();
      const parts = input.split(' ');
      if (parts.length === 1) {
        const match = COMMANDS.find(c => c.startsWith(parts[0]));
        if (match) setInput(match + ' ');
      } else if (parts.length === 2 && parts[0] === 'cat') {
        const match = FILES.find(f => f.startsWith(parts[1]));
        if (match) setInput(`cat ${match}`);
      }
    }
  };

  if (crashed) {
    return (
      <div className="terminal-overlay" onClick={onClose}>
        <div className="terminal-window tv-effect" style={{ backgroundColor: '#0000AA', color: '#FFFFFF', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
          <h1 style={{ textAlign: 'center', backgroundColor: '#AAAAAA', color: '#0000AA', display: 'inline-block', padding: '2px 10px' }}>FATAL ERROR</h1>
          <p style={{ marginTop: '20px' }}>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36. The current application will be terminated.</p>
          <p>* Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.</p>
          <p style={{ textAlign: 'center', marginTop: '40px' }}>Sistem çöktü. Sayfayı yenilemeniz gerekiyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window tv-effect" onClick={(e) => { e.stopPropagation(); document.getElementById('terminal-input')?.focus(); }}>
        <div className="terminal-header">
          <h2 className="terminal-title">
            <FaTerminal className="terminal-icon" />
            user@dijital-oda: ~
          </h2>
          <button className="terminal-close" onClick={onClose}>✕</button>
        </div>
        
        {isPlayingSnake ? (
          <SnakeGame onExit={() => setIsPlayingSnake(false)} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Terminal;
