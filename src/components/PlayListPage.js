import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // 리디렉션을 위한 useNavigate 추가
import Header from './common/Header';  // Header 컴포넌트 추가
import Footer from './common/Footer';  // Footer 컴포넌트 추가

const PlayListPage = () => {
    const [playlistIds, setPlaylistIds] = useState([]);  // 플레이리스트 ID들을 담을 상태
    const [playlistMusicIds, setPlaylistMusicIds] = useState({});  // 플레이리스트별 music_id 상태
    const [musicImageUrls, setMusicImageUrls] = useState({});  // 음악의 이미지 URL 상태
    const navigate = useNavigate();  // 페이지 리디렉션을 위한 navigate

    // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
    useEffect(() => {
        const fetchPlaylists = async () => {
            const userId = localStorage.getItem('userId');  // localStorage에서 사용자 ID 가져오기

            if (!userId) {
                alert('로그인 후 사용해주세요.');
                navigate('/login');  // 로그인 페이지로 리디렉션
                return;
            }

            try {
                // 서버에서 사용자에 해당하는 플레이리스트 ID를 가져오는 API 호출
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/${userId}`);
                
                // 응답 받은 데이터로 플레이리스트 ID 상태 업데이트
                setPlaylistIds(response.data.playlistIds);

                // 각 플레이리스트 ID에 대해 musicId를 가져옴
                for (const playlistId of response.data.playlistIds) {
                    const musicResponse = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/music/${playlistId}`);
                    setPlaylistMusicIds(prevMusicIds => ({
                        ...prevMusicIds,
                        [playlistId]: musicResponse.data.playlist_music_ids
                    }));

                    // 각 플레이리스트에 속한 음악들의 이미지 URL을 가져옴
                    musicResponse.data.playlist_music_ids.forEach(async (musicId) => {
                        const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/playlistmusic/image/${musicId}`);
                        setMusicImageUrls(prevImageUrls => ({
                            ...prevImageUrls,
                            [musicId]: imageResponse.data.album_image_url  // 음악의 이미지 URL만 저장
                        }));
                    });
                }
            } catch (error) {
                console.error('플레이리스트 조회 실패:', error);
                alert('플레이리스트를 가져오는 데 실패했습니다.');
            }
        };

        fetchPlaylists();  // 플레이리스트 ID 데이터를 가져오는 함수 실행
    }, [navigate]);

    return (
        <div>
            <Header />  {/* Header 컴포넌트 추가 */}
            <div style={styles.container}>
                <h1 style={styles.h1}>My Playlists</h1>
                <div style={styles.playlistContainer}>
                    {/* 플레이리스트 ID가 존재하는지 확인 후, 없으면 메시지 출력 */}
                    {playlistIds.length > 0 ? (
                        <ul style={styles.playlistList}>
                            {playlistIds.map((playlistId) => (
                                <li key={playlistId} style={styles.playlistItem}>
                                    <h3 style={styles.playlistTitle}>Playlist ID: {playlistId}</h3>
                                    <div style={styles.musicImagesContainer}>
                                        {/* 해당 플레이리스트의 음악 ID들이 존재하는지 확인 */}
                                        {playlistMusicIds[playlistId] && playlistMusicIds[playlistId].length > 0 ? (
                                            playlistMusicIds[playlistId].map((musicId) => (
                                                <div key={musicId} style={styles.musicImageWrapper}>
                                                    {/* 음악 이미지 URL이 존재하면 표시 */}
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
            <Footer />  {/* Footer 컴포넌트 추가 */}
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
    playlistItemHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
    playlistTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px',
        fontFamily: 'Jua'
    },
    musicImagesContainer: {
        display: 'flex',
        flexDirection: 'row',  // 가로로 나열
        flexWrap: 'wrap',  // 이미지가 넘치면 자동으로 줄바꿈
        justifyContent: 'center',  // 중앙 정렬
        gap: '15px',  // 이미지 간격
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
    albumImageHover: {
        transform: 'scale(1.1)',
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
