import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const RegisterPage = () => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    // Basic validation for any field
    const isValid = (value) => value.trim() !== '';

    // Email validation with regular expression
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Check if password matches confirmPassword
    const isPasswordMatch = password === confirmPassword;

    // Progress calculation
    const progressCount = [
        isValid(userName),
        isValid(userId),
        isValidEmail(email),
        isValid(password),
        isPasswordMatch,
    ].filter(Boolean).length;

    const progressPercent = progressCount * 20;

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!userName || !userId || !email || !password || !confirmPassword) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (!isPasswordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        const registerData = { userId, email, password, userName };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, registerData);
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert('회원가입 실패: 입력 정보를 확인해주세요.');
        }
    };

    return (
        <div>
            <Header />

            <div style={styles.container}>
                <h1 style={styles.h1}>Register</h1>

                {/* 🔵 진행도 표시 바 */}
                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${progressPercent}%` }}></div>
                </div>
                <p>{progressPercent}% 완료</p>

                <form onSubmit={handleRegisterSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>User Name:</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
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
            <Footer />
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
    progressContainer: {
        width: '300px',
        height: '20px',
        borderRadius: '10px',
        backgroundColor: '#eee',
        margin: '20px auto',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#1ED760',
        transition: 'width 0.3s ease',
    },
};

export default RegisterPage;
