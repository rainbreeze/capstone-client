import React, { useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';  // 새로 만든 Header
import Footer from '../common/Footer'; // 기존 Footer

const GamePage = () => {
    // 상태 설정
    const [userId, setUserId] = useState('');
    const [score, setScore] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const [hipster, setHipster] = useState('no');

    // 폼 제출 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        const gameData = {
            userId,
            score,
            genre,
            year,
            artist,
            hipster
        };

        try {
            const response = await axios.post('https://capstone-server-production.up.railway.app/saveGameData', gameData);
            alert(response.data.message); // 성공 시 메시지 표시
        } catch (error) {
            alert('데이터 저장에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />  {/* 새로운 Header 컴포넌트 추가 */}
            <div style={styles.container}>
                <h1>Game Data Submit</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>User ID:</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Score:</label>
                        <input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Genre:</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Year:</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Artist:</label>
                        <input
                            type="text"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Hipster:</label>
                        <select value={hipster} onChange={(e) => setHipster(e.target.value)} style={styles.input}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.submitButton}>제출</button>
                </form>
            </div>
            <Footer />  {/* Footer 컴포넌트 추가 */}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '10px',
    },
    label: {
        fontFamily: 'Jua',  // label의 fontFamily를 Jua로 설정
        fontSize: '2vw',
        display: 'block',  // label을 블록 요소로 만들어 입력 필드와 분리
        marginBottom: '1vh',  // 라벨과 입력창 사이에 간격 추가
    },
    input: {
        padding: '10px',
        marginTop: '5px',
        width: '300px',
        fontSize: '16px',
        fontFamily: 'Jua',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        backgroundColor: '#f8b400',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Jua'
    },
};

export default GamePage;
