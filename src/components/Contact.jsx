import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaUser, FaCopy, FaCheck } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText('mehmetturuncx@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-overlay-backdrop" onClick={onClose}>
      <div className="contact-overlay-panel tv-effect" onClick={(e) => e.stopPropagation()}>
        <div className="contact-header">
          <h2 className="contact-title">
            <FaUser className="contact-icon" />
            Hakkımda
          </h2>
          <button className="contact-close" onClick={onClose}>✕</button>
        </div>

        <div className="contact-content">
          <div className="about-top-row">
            <div className="about-info">
              <h3 className="about-name">Mehmet Turunç</h3>
              <p className="about-school">Balıkesir Üniversitesi</p>
              <p className="about-dept">Bilgisayar Mühendisliği</p>
              <p className="about-year">2. Sınıf</p>
            </div>
            <div className="about-photo-wrapper">
              <img src="me.jpeg" alt="Mehmet Turunç" className="about-photo" />
            </div>
          </div>

          <div className="about-bio">
            <p>Merhaba, ben Mehmet! Python ve React ile projeler geliştiriyorum. Ayrıca dizi, film izlemeyi ve yürüyüş yapmayı seviyorum.</p>
          </div>

          <div className="about-socials-row">
            <a href="https://github.com/mehmetturuncx" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com/in/mehmetturuncx" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaLinkedin /> LinkedIn
            </a>
          </div>

          <div className="about-email-box">
            <FaEnvelope className="email-icon" />
            <span className="email-text">mehmetturuncx@gmail.com</span>
            <button className="copy-btn" onClick={copyEmail} title="E-postayı Kopyala">
              {copied ? <FaCheck style={{ color: '#8da101' }}/> : <FaCopy />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
