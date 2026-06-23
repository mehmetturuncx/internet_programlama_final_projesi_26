import React, { useEffect } from 'react';
import { FaFolderOpen, FaGithub, FaTerminal, FaCode, FaRocket, FaStar, FaCodeBranch } from 'react-icons/fa';
import './Projects.css';

const PROJECTS = [
  {
    id: 'hackathon_26',
    name: 'hackathon_26',
    desc: 'Bir hackathon kapsamında geliştirilen, takım içi yenilikçi bir yazılım projesi çözümü.',
    icon: <FaRocket />,
    language: 'Python',
    color: '#3572A5',
    stars: 12
  },
  {
    id: 'episodd',
    name: 'episodd',
    desc: 'Dizi ve bölümleri takip etmek için geliştirilmiş, kullanıcı dostu bir arayüze sahip takip uygulaması.',
    icon: <FaCode />,
    language: 'JavaScript',
    color: '#f1e05a',
    stars: 8
  },
  {
    id: 'rebin-cli',
    name: 'rebin cli',
    desc: 'Terminal üzerinden çalışarak geliştirici süreçlerini hızlandıran komut satırı aracı (CLI).',
    icon: <FaTerminal />,
    language: 'Go',
    color: '#00ADD8',
    stars: 15
  },
  {
    id: 'internet_programlama_final_projesi_26',
    name: 'internet_programlama_final_projesi_26',
    desc: 'Retro tarzda interaktif bir dijital oda portfolyo projesi. React ve Vite kullanılarak geliştirildi.',
    icon: <FaCode />,
    language: 'JavaScript',
    color: '#f1e05a',
    stars: 5
  },
  {
    id: 'ai-chat-bot',
    name: 'ai-chat-bot',
    desc: 'Yapay zeka entegreli sohbet asistanı (Örnek projedir, detayını bana belirtebilirsiniz).',
    icon: <FaTerminal />,
    language: 'TypeScript',
    color: '#3178c6',
    stars: 3
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
                <a href={`https://github.com/mehmetturuncx/${proj.name}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                  {proj.name}
                </a>
              </h3>
              <p className="project-desc">{proj.desc}</p>
              
              <div className="project-meta" style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                {proj.language && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: proj.color }}></span>
                    {proj.language}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FaStar /> {proj.stars || 0}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FaCodeBranch /> 0
                </span>
              </div>
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
