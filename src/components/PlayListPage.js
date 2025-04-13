import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';

const PlayListPage = () => {
    const [playlists, setPlaylists] = useState([]);  // playlistId + createdAt 담는 배열
    const [playlistMusicIds, setPlaylistMusicIds] = useState({});
    const [musicImageUrls, setMusicImageUrls] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                alert('로그인 후 사용해주세요.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/${userId}`);
                const playlistData = response.data.playlists;
                setPlaylists(playlistData);

                for (const { playlistId } of playlistData) {
                    const musicResponse = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/playlistmusic/${playlistId}`);
                    setPlaylistMusicIds(prev => ({
                        ...prev,
                        [playlistId]: musicResponse.data.playlist_music_ids
                    }));

                    for (const musicId of musicResponse.data.playlist_music_ids) {
                        const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/playlistmusic/image/${musicId}`);
                        setMusicImageUrls(prev => ({
                            ...prev,
                            [musicId]: imageResponse.data.album_image_url
                        }));
                    }
                }
            } catch (error) {
                console.error('플레이리스트 조회 실패:', error);
                alert('플레이리스트를 가져오는 데 실패했습니다.');
            }
        };

        fetchPlaylists();
    }, [navigate]);

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.h1}>My Playlists</h1>
                <div style={styles.playlistContainer}>
                    {playlists.length > 0 ? (
                        <ul style={styles.playlistList}>
                            {playlists.map(({ playlistId, createdAt }) => (
                                <li key={playlistId} style={styles.playlistItem}>
                                    <h3 style={styles.playlistTitle}>Playlist ID: {playlistId}</h3>
                                    <p style={styles.creationDate}>
                                        생성일: {new Date(createdAt).toLocaleDateString('ko-KR')}
                                    </p>
                                    <div style={styles.musicImagesContainer}>
                                        {playlistMusicIds[playlistId] && playlistMusicIds[playlistId].length > 0 ? (
                                            playlistMusicIds[playlistId].map((musicId) => (
                                                <div key={musicId} style={styles.musicImageWrapper}>
                                                    {musicImageUrls[musicId] && (
                                                        <img
                                                            src={musicImageUrls[musicId]}
                                                            alt={`Album cover for music ID ${musicId}`}
                                                            style={styles.albumImage}
                                                        />
                                                    )}
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
        fontStyle: 'JUA',
    },
};

export default PlayListPage;
