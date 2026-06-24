import React, { useEffect } from 'react';
import { FaFolderOpen, FaGithub, FaTerminal, FaCode, FaRocket } from 'react-icons/fa';
import './Projects.css';

const PROJECTS = [
  {
    id: 'hackathon_26',
    name: 'hackathon_26',
    desc: 'HSD ve trex tarafından Bursa Uludağ Üniversitesi\'nde yapılan ve bize 4.lük getiren projemiz.',
    icon: <FaRocket />,
    language: 'Python',
    color: '#3572A5'
  },
  {
    id: 'episodd',
    name: 'episodd',
    desc: 'Dizi ve bölümleri takip etmek için geliştirilmiş, kullanıcı dostu bir arayüze sahip takip uygulaması.',
    icon: <FaCode />,
    language: 'Python',
    color: '#3572A5'
  },
  {
    id: 'rebin-cli',
    name: 'rebin_cli',
    desc: 'Terminal üzerinde çalışan multi-platform bir çöp kutusu uygulaması.',
    icon: <FaTerminal />,
    language: 'Python',
    color: '#3572A5'
  },
  {
    id: 'internet_programlama_final_projesi_26',
    name: 'internet_programlama_final_projesi_26',
    desc: 'Retro tarzda interaktif bir dijital oda portfolyo projesi. React ve Vite kullanılarak geliştirildi.',
    icon: <FaCode />,
    language: 'JavaScript',
    color: '#f1e05a'
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
            <div 
              key={proj.id} 
              className="project-card"
              onClick={() => window.open(`https://github.com/mehmetturuncx/${proj.name}`, '_blank', 'noopener,noreferrer')}
            >
              <h3 className="project-name">
                <span style={{ color: '#5c6a72' }}>{proj.icon}</span>
                <span style={{ color: 'var(--accent)' }}>
                  {proj.name}
                </span>
              </h3>
              <p className="project-desc">{proj.desc}</p>
              
              <div className="project-meta" style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                {proj.language && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: proj.color }}></span>
                    {proj.language}
                  </span>
                )}
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
