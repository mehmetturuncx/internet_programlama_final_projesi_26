import React, { useEffect } from 'react';
import { FaTrophy, FaLock, FaCheckCircle } from 'react-icons/fa';
import './Achievements.css';

const Achievements = ({ onClose, unlocked, achievementsList }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="achievements-overlay-backdrop" onClick={onClose}>
      <div className="achievements-overlay-panel tv-effect" onClick={(e) => e.stopPropagation()}>
        <div className="achievements-header">
          <h2 className="achievements-title">
            <FaTrophy className="achievements-icon" style={{ color: '#d4af37' }} />
            Başarımlar
          </h2>
          <button className="achievements-close" onClick={onClose}>✕</button>
        </div>

        <div className="achievements-content">
          {achievementsList.map((ach) => {
            const isUnlocked = unlocked.includes(ach.id);
            return (
              <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">
                  {isUnlocked ? <FaTrophy /> : <FaLock />}
                </div>
                <div className="achievement-info">
                  <h3 className="achievement-name">{isUnlocked ? ach.title : '???'}</h3>
                  <p className="achievement-desc">{ach.desc}</p>
                </div>
                {isUnlocked && <FaCheckCircle style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '1.5rem' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
