import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate 추가
import Header from '../common/Header';  // Header 컴포넌트 추가
import Footer from '../common/Footer';  // Footer 컴포넌트 추가

const RegisterPage = () => {
    // 상태 설정
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // useNavigate 훅을 사용해 리디렉션 기능 설정
    const navigate = useNavigate();

    // 회원가입 폼 제출 함수
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const registerData = { userId, email, password };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, registerData);
            alert(response.data.message);  // 회원가입 성공 시 메시지 표시

            // 회원가입 성공 후 로그인 페이지로 리디렉션
            navigate('/');  // 홈 페이지로 이동
        } catch (error) {
            alert('회원가입 실패: 입력 정보를 확인해주세요.');
        }
    };

    return (
        <div>
            <Header />  {/* Header 컴포넌트 추가 */}
            <div style={styles.container}>
                <h1 style={styles.h1}>Register</h1>
                <form onSubmit={handleRegisterSubmit}>
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
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.submitButton}>회원가입</button>
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
        fontFamily: 'Jua',
        fontSize: '2vw',
        display: 'block',
        marginBottom: '1vh',
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

export default RegisterPage;
