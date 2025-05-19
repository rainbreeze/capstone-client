import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const RegisterPage = () => {
    const [step, setStep] = useState(1);

    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const isValid = (value) => value.trim() !== '';
    const isValidEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordMatch = password === confirmPassword;

    const isStepValid = () => {
        switch (step) {
            case 1:
                return isValid(userName) && isValid(userId);
            case 2:
                return isValidEmail(email);
            case 3:
                return isValid(password) && isPasswordMatch;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (!isStepValid()) {
            alert('입력을 완료해주세요.');
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

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

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>이   름</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>아이디</label>
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                );
            case 3:
                return (
                    <>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>비밀번호</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>재 입 력</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.h1}>회원가입</h1>

                {/* 프로그레스 */}
                <div style={styles.stepIndicatorWrapper}>
                    {[1, 2, 3].map((s, index) => (
                        <React.Fragment key={s}>
                            <div style={{
                                ...styles.stepCircle,
                                backgroundColor: step >= s ? '#1ED760' : '#fff',
                                color: step >= s ? '#fff' : '#ccc',
                                borderColor: step >= s ? '#1ED760' : '#ccc'
                            }}>
                                {s}
                            </div>
                            {index < 2 && (
                                <div style={{
                                    ...styles.stepLine,
                                    backgroundColor: step > s ? '#1ED760' : '#ccc'
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <form onSubmit={handleRegisterSubmit}>
                    {renderStepContent()}

                    <div style={{ marginTop: '20px' }}>
                        {step > 1 && (
                            <button type="button" onClick={handleBack} style={{ ...styles.submitButton, marginRight: '10px' }}>
                                이전
                            </button>
                        )}
                        {step < 3 && (
                            <button type="button" onClick={handleNext} style={styles.submitButton}>
                                다음
                            </button>
                        )}
                        {step === 3 && (
                            <button type="submit" style={styles.submitButton}>
                                회원가입
                            </button>
                        )}
                    </div>
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
    stepIndicatorWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '10px',
    },
    stepCircle: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '2px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        fontFamily: 'Jua',
        transition: 'all 0.3s ease',
    },
    stepLine: {
        width: '40px',
        height: '2px',
        backgroundColor: '#ccc',
        transition: 'background-color 0.3s ease',
    },
};

export default RegisterPage;
