import React, { useState, useCallback, useEffect, useRef } from 'react';
import './Room.css';
import Terminal from './Terminal';
import Movies from './Movies';
import Music from './Music';
import Contact from './Contact';
import Projects from './Projects';
import Achievements from './Achievements';
import { FaLightbulb, FaPlay, FaPause, FaMusic, FaMoon, FaSun, FaTrophy } from 'react-icons/fa';

const ITEMS = [
  {
    id: 'computer',
    src: 'assets/computer.png',
    label: 'Terminal',
    desc: 'Terminal Açıldı',
    zIndex: 10,
    hitbox: { top: '37.5%', left: '38%', width: '24%', height: '48%' },
    origin: '50% 57.5%',
  },
  {
    id: 'bookshelf',
    src: 'assets/bookshelf.png',
    label: 'Filmler',
    desc: 'Son İzlediğim Filmler',
    zIndex: 11,
    hitbox: { top: '2%', left: '0%', width: '9%', height: '54%' },
    origin: '4.5% 29%',
  },
  {
    id: 'speaker',
    src: 'assets/speaker.png',
    label: 'Lofi Radyo',
    desc: 'Lofi Radyo (Aç / Kapat)',
    zIndex: 12,
    hitbox: { top: '61%', left: '0%', width: '5.5%', height: '22%' },
    origin: '2.75% 72%',
  },
  {
    id: 'tv',
    src: 'assets/tv.png',
    label: 'Müzikler',
    desc: 'Favori Müziklerim',
    zIndex: 13,
    hitbox: { top: '53%', left: '75.5%', width: '18.5%', height: '38%' },
    origin: '84.75% 68%',
  },
  {
    id: 'folders',
    src: 'assets/folders.png',
    label: 'Projeler',
    desc: 'Projeler ve Çalışmalarım',
    zIndex: 14,
    hitbox: { top: '60%', left: '24%', width: '8.5%', height: '30%' },
    origin: '28.25% 71.5%',
  },
  {
    id: 'pencilbox',
    src: 'assets/pencil-box.png',
    label: 'Hakkımda',
    desc: 'Hakkımda / İletişim',
    zIndex: 15,
    hitbox: { top: '66%', left: '29%', width: '8%', height: '24%' },
    origin: '33% 74%',
  },
];

const ACHIEVEMENTS_LIST = [
  { id: 'music', title: 'Yeni nesil ne dinliyor ya?', desc: 'Lofi radyoyu açtın.' },
  { id: 'snake', title: 'Burası Nokia 3310 mu?', desc: 'Terminalde yılan oyunu oynadın.' },
  { id: 'crash', title: 'Pek iyi bir fikir sayılmaz değil mi?', desc: 'Terminali çökerttin.' },
  { id: 'night', title: 'Gece Kuşu', desc: 'Gece modunu aktif ettin.' },
  { id: 'terminal', title: 'Who Am I?', desc: 'Terminali ilk kez açtın.' }
];

let audioCtx = null;

const playHoverSound = () => {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Kısa retro / piksel-art bir tıklama (blip) sesi
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Tarayıcı otomatik ses çalmayı engelliyorsa hatayı yoksay
  }
};

const Room = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [moviesOpen, setMoviesOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [terminalCrashed, setTerminalCrashed] = useState(false);
  
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [latestAchievement, setLatestAchievement] = useState(null);

  const audioRef = useRef(null);

  const unlockAchievement = useCallback((id) => {
    setUnlockedAchievements(prev => {
      if (!prev.includes(id)) {
        const ach = ACHIEVEMENTS_LIST.find(a => a.id === id);
        setLatestAchievement(ach);
        setTimeout(() => setLatestAchievement(null), 4000);
        return [...prev, id];
      }
      return prev;
    });
  }, []);

  const toggleRadio = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.15; // hafif arka plan müziği
        audioRef.current.play().catch(err => console.error("Müzik başlatılamadı:", err));
        unlockAchievement('music');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleHintClick = (e) => {
    e.stopPropagation();
    if (showHints) return; // Zaten yanıyorsa tekrar tetikleme
    setShowHints(true);
    setTimeout(() => {
      setShowHints(false);
    }, 4000);
  };

  const handleMouseEnter = useCallback((id) => {
    const el = document.querySelector(`[data-item-id="${id}"]`);
    if (el) el.classList.add('hovered');
    setHoveredItem(id);
    playHoverSound();
  }, []);

  const handleMouseLeave = useCallback((id) => {
    const el = document.querySelector(`[data-item-id="${id}"]`);
    if (el) el.classList.remove('hovered');
    setHoveredItem(null);
  }, []);

  const handleItemClick = (e, id) => {
    e.stopPropagation();

    if (id === 'computer') {
      setTerminalOpen(true);
      setActivePanel(null);
      unlockAchievement('terminal');
    } else if (id === 'bookshelf') {
      setMoviesOpen(true);
      setActivePanel(null);
    } else if (id === 'tv') {
      setMusicOpen(true);
      setActivePanel(null);
    } else if (id === 'folders') {
      setProjectsOpen(true);
      setActivePanel(null);
    } else if (id === 'speaker') {
      toggleRadio(e);
      setActivePanel(null);
    } else if (id === 'pencilbox') {
      setContactOpen(true);
      setActivePanel(null);
    } else {
      setActivePanel(id);
    }
  };

  const handleContainerClick = () => {
    if (activePanel) setActivePanel(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePanel(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Gece moduna göre tüm body'e dark theme class'ını uygula
  useEffect(() => {
    if (isNight) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isNight]);

  const activePanelDesc = ITEMS.find((item) => item.id === activePanel)?.desc;

  return (
    <>
      <div className="room-container" onClick={handleContainerClick}>
        
        {/* İpucu Butonu */}
        <button className="hint-btn" onClick={handleHintClick}>
          <FaLightbulb style={{ marginRight: '5px' }} /> İpucu
        </button>

        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px', zIndex: 100 }}>
          {/* Başarımlar Butonu */}
          <button className="theme-toggle-btn" onClick={(e) => { e.stopPropagation(); setAchievementsOpen(true); }}>
            <FaTrophy style={{ color: '#d4af37' }} />
          </button>

          {/* Gece/Gündüz Teması Değiştirme Butonu */}
          <button className="theme-toggle-btn" onClick={(e) => { 
            e.stopPropagation(); 
            setIsNight(!isNight); 
            if (!isNight) unlockAchievement('night');
          }}>
            {isNight ? <FaSun style={{ color: '#eadaad' }} /> : <FaMoon style={{ color: '#fdf6e3' }} />}
            <span style={{ marginLeft: '8px' }}>{isNight ? 'Gündüz' : 'Gece'}</span>
          </button>
        </div>

        {/* Arka plan */}
        <img src={isNight ? "night.png" : "background.png"} alt="Room Background" className="room-bg" draggable="false" />
        
        {/* Pencere Manzarası (Gece versiyonunda tüm oda tek görselde olduğu için bunu gündüz gösteriyoruz) */}
        {!isNight && (
          <img src="assets/window.png" alt="Window View" className="room-window" draggable="false" />
        )}

        {/* Partiküller: mask-image sayesinde SADECE pencerenin olduğu kısımda görünürler! */}
        <div className="window-particles-container">
          {/* Toz Zerreleri */}
          {React.useMemo(() => Array.from({ length: 35 }).map((_, i) => {
            const size = Math.random() * 6 + 4; // 4-10px (Daha belirgin)
            return (
              <div
                key={`pollen-${i}`}
                className="pollen"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  animationDelay: `${Math.random() * -20}s`,
                }}
              />
            );
          }), [])}
        </div>

        {ITEMS.map((item) => (
          <img
            key={item.id}
            data-item-id={item.id}
            src={item.src}
            alt={item.label}
            className={`room-item ${showHints ? 'hint-glow' : ''} ${isPlaying && item.id === 'speaker' ? 'speaker-pulse' : ''}`}
            style={{ zIndex: item.zIndex, transformOrigin: item.origin }}
            draggable="false"
          />
        ))}

        {ITEMS.map((item) => (
          <div
            key={`hitbox-${item.id}`}
            className="hitbox"
            style={{ ...item.hitbox, zIndex: 50 }}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
            onClick={(e) => handleItemClick(e, item.id)}
          >
            <div className={`item-label ${(hoveredItem === item.id || showHints) ? 'visible' : ''}`}>
              {item.label}
            </div>
          </div>
        ))}

        {activePanel && (
          <div className="info-panel" onClick={(e) => e.stopPropagation()}>
            <p>{activePanelDesc}</p>
          </div>
        )}
      </div>

      {terminalOpen && (
        <Terminal 
          onClose={() => setTerminalOpen(false)} 
          onUnlockAchievement={unlockAchievement}
          crashed={terminalCrashed}
          onCrash={() => setTerminalCrashed(true)}
        />
      )}
      {moviesOpen && <Movies onClose={() => setMoviesOpen(false)} />}
      {musicOpen && <Music onClose={() => setMusicOpen(false)} />}
      {contactOpen && <Contact onClose={() => setContactOpen(false)} />}
      {projectsOpen && <Projects onClose={() => setProjectsOpen(false)} />}
      {achievementsOpen && <Achievements onClose={() => setAchievementsOpen(false)} unlocked={unlockedAchievements} achievementsList={ACHIEVEMENTS_LIST} />}
      
      {/* Toast Bildirimi */}
      {latestAchievement && (
        <div className="achievement-toast">
          <FaTrophy className="toast-icon" />
          <div className="toast-info">
            <h4>Başarım Kazanıldı</h4>
            <p>{latestAchievement.title}</p>
          </div>
        </div>
      )}

      {/* Yerel HTML5 Müzik Çalar */}
      <audio ref={audioRef} src="assets/lofi-bg.mp3" loop preload="auto" />
    </>
  );
};

export default Room;
