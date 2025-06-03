// pages/PlayListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import PlaylistDetailModal from './playlistDetailModal';

const PlayListPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFullPlaylists = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('로그인 후 사용해주세요.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/full/${userId}`);
        setPlaylists(response.data);
      } catch (error) {
        alert('플레이리스트를 가져오는 데 실패했습니다.');
      }
    };
    fetchFullPlaylists();
  }, [navigate]);

  const handleDeletePlaylist = async (playlistId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${playlistId}`);
      alert(response.data.message);
      setPlaylists(prev => prev.filter(p => p.playlistId !== playlistId));
    } catch (error) {
      alert('플레이리스트 삭제 실패');
    }
  };

  const handleCardClick = (playlistId) => {
    const playlist = playlists.find(p => p.playlistId === playlistId);
    setSelectedPlaylist(playlist);
  };

  const handleCloseDetail = () => setSelectedPlaylist(null);

  const handleImageClick = (musicId, albumImageUrl) => {
    navigate('/write', { state: { musicId, imageUrl: albumImageUrl } });
  };

  return (
    <div>
      <Header />
      <div style={styles.imageContainer}>
        <img
          src="images/playlist/top_banner.png"
          alt="헤더 배경 이미지"
          style={styles.headerImage}
        />
        <div style={styles.overlayText}>
          내가 만든 음악으로,<br />
          세상과 함께 듣고 나누세요.
        </div>
        <div style={styles.listenHereText}>감상 가능한 곳</div>
        <div style={styles.logoContainer}>
          <img src="images/playlist/logo1.png" alt="YouTube" style={styles.logo} />
          <img src="images/playlist/logo2.png" alt="Spotify" style={styles.logo} />
        </div>
      </div>

      <div style={styles.container}>
        <h1 style={styles.h1}>내 음악</h1>
        <div style={styles.cardListContainer}>
          {playlists.map((playlist) => {
            const firstMusic = playlist.musics[0];
            if (!firstMusic) return null;

            const genre = firstMusic.genre || '장르 없음';
            const createdAt = new Date(playlist.createdAt).toLocaleDateString('ko-KR');

            return (
              <div
                key={playlist.playlistId}
                style={{
                  ...styles.playlistCard,
                  backgroundImage: `url(${firstMusic.albumImageUrl})`,
                }}
                onClick={() => handleCardClick(playlist.playlistId)}
              >
                <div style={styles.cardOverlay}>
                  <div style={styles.cardGenre}>{genre}</div>
                  <div style={styles.cardDate}>{createdAt}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />

      <PlaylistDetailModal
        playlist={selectedPlaylist}
        onClose={handleCloseDetail}
        onDelete={handleDeletePlaylist}
        onTrackClick={handleImageClick}
      />
    </div>
  );
};

const styles = {
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '72vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  overlayText: {
    position: 'absolute',
    bottom: '8vh',
    left: '12vw',
    color: 'white',
    fontSize: '2vw',
    fontWeight: '600',
    textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
    lineHeight: '1.4',
    maxWidth: '60vw',
    fontFamily: 'Noto Sans KR',
  },
  listenHereText: {
    position: 'absolute',
    bottom: '95px',
    right: '30px',
    color: 'rgba(110, 110, 110, 0.8)',
    fontSize: '0.8rem',
    fontWeight: '500',
    fontFamily: 'Noto Sans KR',
    userSelect: 'none',
  },
  logoContainer: {
    position: 'absolute',
    bottom: '15px',
    right: '30px',
    display: 'flex',
    gap: '15px',
  },
  logo: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    cursor: 'pointer',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))',
  },
  container: {
    padding: '0 10vw',
    margin: '4vh 0',
    textAlign: 'start',
  },
  h1: {
    fontSize: '2.5vw',
    fontWeight: '700',
    marginBottom: '20px',
  },
  cardListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  playlistCard: {
    cursor: 'pointer',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    textAlign: 'center',
  },
  cardGenre: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '5px',
  },
  cardDate: {
    fontSize: '0.85rem',
    color: '#ddd',
  },
};

export default PlayListPage;
