import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../common/Header';  // 새로 만든 Header
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';  // useNavigate를 import

const TestPage = () => {
    // 상태 설정
    const [userId, setUserId] = useState('');  // userId는 로컬 스토리지에서 가져올 것
    const [score, setScore] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();  // navigate 함수 사용

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 userId 가져오기
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);  // 로컬 스토리지에서 userId를 가져와 상태에 설정
        }
    }, []);  // 컴포넌트 마운트 시 한 번만 실행

    // 폼 제출 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        const gameData = {
            userId,  // 로컬 스토리지에서 가져온 userId 사용
            score,
            genre,
            year,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/savegamedata`, gameData);

            // 추천된 곡을 GameResultPage로 전달
            console.log(userId);
            navigate('/testResult', { state: { musicRecommendation: response.data.musicRecommendation } });
        } catch (error) {
            alert('데이터 저장에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />  {/* 새로운 Header 컴포넌트 추가 */}
            <div style={styles.container}>
                <h1 style={styles.h1}>Game Data Submit</h1>
                <form onSubmit={handleSubmit}>
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
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.submitButton}>제출</button>
                </form>
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
        backgroundColor: '#1ED760',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Jua'
    },
};

export default TestPage;
