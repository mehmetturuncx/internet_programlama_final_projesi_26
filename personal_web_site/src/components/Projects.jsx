import React, { useEffect } from 'react';
import { FaFolderOpen, FaGithub, FaTerminal, FaCode, FaRocket } from 'react-icons/fa';
import './Projects.css';

const PROJECTS = [
  {
    id: 'hackathon_26',
    name: 'hackathon_26',
    desc: 'Bir hackathon kapsamında geliştirilen, takım içi yenilikçi bir yazılım projesi çözümü.',
    icon: <FaRocket />
  },
  {
    id: 'episodd',
    name: 'episodd',
    desc: 'Dizi ve bölümleri takip etmek için geliştirilmiş, kullanıcı dostu bir arayüze sahip takip uygulaması.',
    icon: <FaCode />
  },
  {
    id: 'rebin-cli',
    name: 'rebin cli',
    desc: 'Terminal üzerinden çalışarak geliştirici süreçlerini hızlandıran komut satırı aracı (CLI).',
    icon: <FaTerminal />
  }
];

const Projects = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="projects-overlay-backdrop" onClick={onClose}>
      <div className="projects-overlay-panel tv-effect" onClick={(e) => e.stopPropagation()}>
        <div className="projects-header">
          <h2 className="projects-title">
            <FaFolderOpen className="projects-icon" style={{ color: '#d3c6a6' }} />
            Projeler
          </h2>
          <button className="projects-close" onClick={onClose}>✕</button>
        </div>

        <div className="projects-content">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="project-card">
              <h3 className="project-name">
                <span style={{ color: '#5c6a72' }}>{proj.icon}</span>
                {proj.name}
              </h3>
              <p className="project-desc">{proj.desc}</p>
            </div>
          ))}

          <div className="projects-footer">
            <a 
              href="https://github.com/mehmetturuncx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="github-link-btn"
            >
              <FaGithub /> Tüm Projeler İçin GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
