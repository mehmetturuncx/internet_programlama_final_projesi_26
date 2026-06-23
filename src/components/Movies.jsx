import React, { useState, useEffect } from 'react';
import { FaFilm, FaImage } from 'react-icons/fa';
import './Movies.css';

const Movies = ({ onClose }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LETTERBOXD_USERNAME = 'mehmetturunc';

  useEffect(() => {
    const rssUrl = `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Ağ hatası');
        return res.json();
      })
      .then((data) => {
        if (data.status !== 'ok') throw new Error('RSS ayrıştırılamadı');
        
        // Sadece son 8 filmi alalım
        const recentItems = data.items.slice(0, 8);

        const parsedMovies = recentItems.map(item => {
          const imgMatch = item.description.match(/src="([^"]+)"/);
          const posterUrl = imgMatch ? imgMatch[1] : null;
          
          return {
            title: item.title,
            link: item.link,
            poster: posterUrl,
            pubDate: item.pubDate
          };
        });
        
        setMovies(parsedMovies);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="movies-overlay-backdrop" onClick={onClose}>
      <div className="movies-overlay-panel tv-effect" onClick={(e) => e.stopPropagation()}>
        <div className="movies-header">
          <h2 className="movies-title">
            <FaFilm className="movie-icon" />
            Son İzlediğim Filmler
          </h2>
          <button className="movies-close" onClick={onClose}>✕</button>
        </div>

        <div className="movies-content">
          {loading && (
            <div className="movies-loading-state">
              <p className="loading-text">Filmler Letterboxd'den çekiliyor...</p>
            </div>
          )}

          {error && (
            <div className="movies-error-state">
              <p>⚠️ {error}</p>
              <p className="movies-error-hint">Letterboxd verilerine şu an ulaşılamıyor.</p>
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="movies-grid">
              {movies.map((movie, index) => (
                <a
                  key={index}
                  href={movie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie-card"
                >
                  <div className="movie-poster-container">
                    {movie.poster ? (
                      <img src={movie.poster} alt={movie.title} className="movie-poster" />
                    ) : (
                      <div className="movie-poster-placeholder">
                        <FaImage className="placeholder-icon" />
                        <span>Görsel Yok</span>
                      </div>
                    )}
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-name">{movie.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="movies-footer">
          <a
            href={`https://letterboxd.com/${LETTERBOXD_USERNAME}/films/`}
            target="_blank"
            rel="noopener noreferrer"
            className="letterboxd-link"
          >
            Son izlediğim tüm filmleri incele →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Movies;
