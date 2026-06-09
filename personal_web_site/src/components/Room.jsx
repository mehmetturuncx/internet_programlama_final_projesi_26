import React, { useState, useCallback, useEffect } from 'react';
import './Room.css';
import Projects from './Projects';

const ITEMS = [
  {
    id: 'computer',
    src: '/assets/computer.png',
    label: 'GitHub Projeleri',
    zIndex: 10,
    hitbox: { top: '28%', left: '32%', width: '36%', height: '59%' },
    origin: '50% 57.5%',
  },
  {
    id: 'bookshelf',
    src: '/assets/bookshelf.png',
    label: 'Kitaplık Açıldı',
    zIndex: 11,
    hitbox: { top: '2%', left: '0%', width: '9%', height: '54%' },
    origin: '4.5% 29%',
  },
  {
    id: 'speaker',
    src: '/assets/speaker.png',
    label: 'Müzik Çalar Açıldı',
    zIndex: 12,
    hitbox: { top: '61%', left: '0%', width: '5.5%', height: '22%' },
    origin: '2.75% 72%',
  },
  {
    id: 'tv',
    src: '/assets/tv.png',
    label: 'TV Açıldı',
    zIndex: 13,
    hitbox: { top: '53%', left: '75.5%', width: '18.5%', height: '30%' },
    origin: '84.75% 68%',
  },
  {
    id: 'folders',
    src: '/assets/folders.png',
    label: 'Projeler Açıldı',
    zIndex: 14,
    hitbox: { top: '60%', left: '24%', width: '8.5%', height: '23%' },
    origin: '28.25% 71.5%',
  },
  {
    id: 'pencilbox',
    src: '/assets/pencil-box.png',
    label: 'Kalem Kutusu Açıldı',
    zIndex: 15,
    hitbox: { top: '66%', left: '29%', width: '8%', height: '16%' },
    origin: '33% 74%',
  },
];

const Room = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const handleMouseEnter = useCallback((id) => {
    const el = document.querySelector(`[data-item-id="${id}"]`);
    if (el) el.classList.add('hovered');
  }, []);

  const handleMouseLeave = useCallback((id) => {
    const el = document.querySelector(`[data-item-id="${id}"]`);
    if (el) el.classList.remove('hovered');
  }, []);

  const handleItemClick = (e, id) => {
    e.stopPropagation();

    if (id === 'computer') {
      setProjectsOpen(true);
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

  const activePanelLabel = ITEMS.find((item) => item.id === activePanel)?.label;

  return (
    <>
      <div className="room-container" onClick={handleContainerClick}>
        <img src="/background.png" alt="Room Background" className="room-bg" draggable="false" />

        {ITEMS.map((item) => (
          <img
            key={item.id}
            data-item-id={item.id}
            src={item.src}
            alt={item.label}
            className="room-item"
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
          />
        ))}

        {activePanel && (
          <div className="info-panel" onClick={(e) => e.stopPropagation()}>
            <p>{activePanelLabel}</p>
          </div>
        )}
      </div>

      {projectsOpen && <Projects onClose={() => setProjectsOpen(false)} />}
    </>
  );
};

export default Room;
