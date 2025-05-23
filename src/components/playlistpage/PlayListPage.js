import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const PlayListPage = () => {
    const [playlists, setPlaylists] = useState([]);  // playlists + 각 음악 배열 포함
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
                // response.data가 playlists 배열 [{ playlistId, createdAt, musics: [...] }, ...]
                setPlaylists(response.data);
            } catch (error) {
                console.error('전체 플레이리스트 조회 실패:', error);
                alert('플레이리스트를 가져오는 데 실패했습니다.');
            }
        };

        fetchFullPlaylists();
    }, [navigate]);

    const handleDeletePlaylist = async (playlistId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${playlistId}`);
            alert(response.data.message);
            setPlaylists(prev => prev.filter(playlist => playlist.playlistId !== playlistId));
        } catch (error) {
            console.error('플레이리스트 삭제 실패:', error);
            alert('플레이리스트를 삭제하는 데 실패했습니다.');
        }
    };

    const handleImageClick = (musicId, albumImageUrl) => {
        navigate('/write', { state: { musicId, imageUrl: albumImageUrl } });
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.h1}>My Playlists</h1>
                <div style={styles.playlistContainer}>
                    {playlists.length > 0 ? (
                        <ul style={styles.playlistList}>
                            {playlists.map(({ playlistId, createdAt, musics }) => (
                                <li key={playlistId} style={styles.playlistItem}>
                                    <h3 style={styles.playlistTitle}>Playlist ID: {playlistId}</h3>
                                    <p style={styles.creationDate}>
                                        생성일: {new Date(createdAt).toLocaleDateString('ko-KR')}
                                    </p>
                                    <button onClick={() => handleDeletePlaylist(playlistId)} style={styles.deleteButton}>
                                        삭제
                                    </button>
                                    <div style={styles.musicImagesContainer}>
                                        {musics.length > 0 ? (
                                            musics.map(({ playlistMusicId, musicId, albumImageUrl, trackName }) => (
                                                <div key={playlistMusicId} style={styles.musicImageWrapper}>
                                                    <img
                                                        src={albumImageUrl}
                                                        alt={`Album cover for ${trackName}`}
                                                        style={styles.albumImage}
                                                        onClick={() => handleImageClick(musicId, albumImageUrl)}
                                                    />
                                                    <p>{trackName}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={styles.noMusicText}>이 플레이리스트에 음악이 없습니다.</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={styles.noPlaylistText}>현재 플레이리스트가 없습니다. 새로운 플레이리스트를 생성하세요!</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    // ... 기존 스타일 그대로 유지
    deleteButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.3s ease',
    },
    h1: {
        fontSize: '3.5rem',
        fontFamily: 'Jua',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    container: {
        padding: '0 10vw',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    playlistContainer: {
        marginTop: '20px',
    },
    playlistList: {
        listStyleType: 'none',
        padding: '0',
    },
    playlistItem: {
        position: 'relative',
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    playlistTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px',
        fontFamily: 'Jua',
    },
    creationDate: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '10px',
    },
    musicImagesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px',
    },
    musicImageWrapper: {
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    },
    albumImage: {
        width: '12vw',
        height: '18vh',
        objectFit: 'cover',
        borderRadius: '8px',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
    },
    noMusicText: {
        color: '#888',
        fontSize: '1rem',
        fontStyle: 'italic',
    },
    noPlaylistText: {
        color: '#888',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        fontFamily: 'Jua',
    },
};

export default PlayListPage;
