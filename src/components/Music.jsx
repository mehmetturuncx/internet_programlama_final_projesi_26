import React, { useEffect } from 'react';
import { FaMusic, FaCompactDisc, FaApple } from 'react-icons/fa';
import './Music.css';

const MUSIC_LIST = [
  { id: 1, title: "505", artist: "Arctic Monkeys" },
  { id: 2, title: "A Place for My Head", artist: "Linkin Park" },
  { id: 3, title: "Chamber of Reflection", artist: "Mac DeMarco" },
  { id: 4, title: "Feel Good Inc.", artist: "Gorillaz" },
  { id: 5, title: "I Was Made for Lovin' You", artist: "Kiss" },
  { id: 6, title: "Karma Police", artist: "Radiohead" },
  { id: 7, title: "Loser", artist: "Tame Impala" },
  { id: 8, title: "Paint It, Black", artist: "The Rolling Stones" },
  { id: 9, title: "Sarılırım Birine", artist: "Adamlar" },
  { id: 10, title: "Softcore", artist: "The Neighbourhood" }
];

const PLAYLIST_LINK = "https://music.apple.com/tr/playlist/evet/pl.u-pMylg4LCWqDvjLY?ls";

const Music = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="music-overlay-backdrop" onClick={onClose}>
      <div className="music-overlay-panel tv-effect" onClick={(e) => e.stopPropagation()}>
        <div className="music-header">
          <h2 className="music-title">
            <FaMusic className="music-icon" />
            Favori Müziklerim
          </h2>
          <button className="music-close" onClick={onClose}>✕</button>
        </div>

        <div className="music-content">
          <p className="music-intro">Bu liste Mehmet'in en çok dinlediği ve sevdiği parçalardan oluşmaktadır.</p>
          
          <div className="music-list">
            {MUSIC_LIST.map((song) => (
              <div key={song.id} className="music-card">
                <div className="music-cover-placeholder">
                  <FaCompactDisc />
                </div>
                <div className="music-info">
                  <h3 className="music-name">{song.title}</h3>
                  <p className="music-artist">{song.artist}</p>
                </div>
                <a
                  href={`https://music.apple.com/tr/search?term=${encodeURIComponent(song.title + ' ' + song.artist)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-music-btn"
                  title="Apple Music'te Ara"
                >
                  <FaApple className="apple-icon" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="music-footer">
          <a
            href={PLAYLIST_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="playlist-main-btn"
          >
            <FaApple className="apple-icon" /> Tüm Çalma Listesini Dinle
          </a>
        </div>
      </div>
    </div>
  );
};

export default Music;
