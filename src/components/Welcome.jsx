import React, { useState } from 'react';
import './Welcome.css';

const Welcome = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 600); // Wait for the animation to finish
  };

  return (
    <div className="welcome-overlay">
      <div className={`welcome-panel ${isClosing ? 'closing' : ''}`}>
        <h2 className="welcome-title">Dijital Odama Hoş Geldiniz!</h2>
        <p className="welcome-text">
          Bu interaktif portfolyo sitesinde her şey tıklanabilir! Odamdaki eşyaların üzerine gelerek projelerimi, müzik zevkimi ve hakkımdaki detayları keşfedebilirsiniz.
        </p>
        <p className="welcome-text">
          İçeride keşfedilmeyi bekleyen gizli sürprizler (easter egg'ler) ve toplanabilir başarımlar bulunuyor. Etrafa tıklamaktan ve terminali kurcalamaktan çekinmeyin!
        </p>
        <p className="welcome-text" style={{ textAlign: 'center', marginTop: '1.5rem', color: '#d3c6aa' }}>
          Hazırsan kapıyı aralayalım...
        </p>
        <button className="welcome-btn" onClick={handleClose}>
          Odaya Gir
        </button>
      </div>
    </div>
  );
};

export default Welcome;
