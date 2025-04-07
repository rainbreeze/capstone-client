import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // 리디렉션을 위한 useNavigate 추가
import Header from './common/Header';  // Header 컴포넌트 추가
import Footer from './common/Footer';  // Footer 컴포넌트 추가

const PlayListPage = () => {
    const [playlistIds, setPlaylistIds] = useState([]);  // 플레이리스트 ID들을 담을 상태
    const [playlistMusicIds, setPlaylistMusicIds] = useState({});  // 플레이리스트별 music_id 상태
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
                        <ul>
                            {playlistIds.map((playlistId) => (
                                <li key={playlistId} style={styles.playlistItem}>
                                    <h3>Playlist ID: {playlistId}</h3>
                                    <ul>
                                        {/* 해당 플레이리스트의 음악 ID들이 존재하는지 확인 */}
                                        {playlistMusicIds[playlistId] && playlistMusicIds[playlistId].length > 0 ? (
                                            playlistMusicIds[playlistId].map((musicId) => (
                                                <li key={musicId}>
                                                    <p>Music ID: {musicId}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p>이 플레이리스트에 음악이 없습니다.</p>
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>현재 플레이리스트가 없습니다. 새로운 플레이리스트를 생성하세요!</p>
                    )}
                </div>
            </div>
            <Footer />  {/* Footer 컴포넌트 추가 */}
        </div>
    );
};

const styles = {
    h1: {
        fontSize: '4vw',
        fontFamily: 'Jua',
    },
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    playlistContainer: {
        marginTop: '20px',
    },
    playlistItem: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
};

export default PlayListPage;
