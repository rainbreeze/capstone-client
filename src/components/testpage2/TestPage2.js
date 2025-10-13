import React, { useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

const TestPage2 = () => {

    // --- hello API 상태 추가 ---
    const [helloMessage, setHelloMessage] = useState('');
    const [helloError, setHelloError] = useState('');

    const callHelloApi = async () => {
        setHelloError('');
        setHelloMessage('');
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/genreapi/hello`;
            const res = await axios.get(apiUrl);
            setHelloMessage(res.data.message);
        } catch (err) {
            setHelloError('Hello API 호출 실패: ' + err.message);
        }
    };

    const [formData, setFormData] = useState({
        danceability: 0.5,
        energy: 0.5,
        loudness: -10,
        mode: 1,
        acousticness: 0.2,
        instrumentalness: 0.1,
        liveness: 0.15,
        valence: 0.5,
        tempo: 120
    });

    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const fieldInfo = {
        danceability: {
            label: 'Danceability',
            placeholder: '음악이 춤추기 얼마나 적합한지 (0.0 ~ 1.0)',
            description: '곡이 얼마나 춤추기 좋은지 나타내는 지표입니다.',
            min: 0,
            max: 1,
            step: 0.05,
        },
        energy: {
            label: 'Energy',
            placeholder: '곡의 강도와 활동성 (0.0 ~ 1.0)',
            description: '곡의 활기차고 강한 정도를 의미합니다.',
            min: 0,
            max: 1,
            step: 0.05,
        },
        loudness: {
            label: 'Loudness',
            placeholder: '곡의 전체 음량 (보통 -60 ~ 0 데시벨)',
            description: '곡의 평균 음량을 데시벨 단위로 나타냅니다.',
            min: -60,
            max: 0,
            step: 5,
        },
        mode: {
            label: 'Mode',
            placeholder: '0 = 단조, 1 = 장조',
            description: '곡이 단조(0)인지 장조(1)인지를 나타냅니다.',
            min: 0,
            max: 1,
            step: 1,
        },
        acousticness: {
            label: 'Acousticness',
            placeholder: '곡이 어쿠스틱인지 여부 (0.0 ~ 1.0)',
            description: '곡이 어쿠스틱(악기 중심)인지의 정도입니다.',
            min: 0,
            max: 1,
            step: 0.05,
        },
        instrumentalness: {
            label: 'Instrumentalness',
            placeholder: '곡에 보컬이 없는 정도 (0.0 ~ 1.0)',
            description: '곡에 보컬이 없고 악기만 있는 정도를 나타냅니다.',
            min: 0,
            max: 1,
            step: 0.05,
        },
        liveness: {
            label: 'Liveness',
            placeholder: '라이브 공연 여부 (0.0 ~ 1.0)',
            description: '곡이 라이브 공연인지 여부를 나타냅니다.',
            min: 0,
            max: 1,
            step: 0.05,
        },
        valence: {
            label: 'Valence',
            placeholder: '음악의 긍정적, 명랑한 느낌 (0.0 ~ 1.0)',
            description: '곡이 얼마나 긍정적이고 명랑한지를 나타냅니다.',
            min: 0,
            max: 1,
            step: 0.05,
        },
        tempo: {
            label: 'Tempo',
            placeholder: '곡의 템포(BPM, 예: 120.0)',
            description: '곡의 분당 박자 수(BPM)를 나타냅니다.',
            min: 40,
            max: 250,
            step: 5,
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === '' ? '' : Number(value)
        }));
    };

    // +/- 버튼 클릭 시 값 조절
    const handleStepChange = (key, increment) => {
        setFormData(prev => {
            let newValue = Number(prev[key]) + increment * (fieldInfo[key].step || 0.1);

            // 최소/최대값 제한
            if (fieldInfo[key].min !== undefined) {
                newValue = Math.max(newValue, fieldInfo[key].min);
            }
            if (fieldInfo[key].max !== undefined) {
                newValue = Math.min(newValue, fieldInfo[key].max);
            }

            // mode와 tempo는 정수로 반올림
            if (key === 'mode' || key === 'tempo') {
                newValue = Math.round(newValue);
            } else {
                // 그 외는 소수점 2자리로 반올림 (원하는 자리수에 맞게 조절 가능)
                newValue = Number(newValue.toFixed(3));
            }

            return {
                ...prev,
                [key]: newValue
            };
        });
    };
    const handlePredict = async () => {
        setError('');
        setResult('');

        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/genreapi/predict`;

            const payload = {};
            Object.keys(formData).forEach(key => {
                payload[key] = parseFloat(formData[key]);
            });

            const res = await axios.post(apiUrl, payload);
            setResult(res.data.predicted_genre);
        } catch (err) {
            setError('API 호출 실패: ' + err.message);
        }
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.h1}>🎵 Genre Prediction Test</h1>
                {/* ====== Hello API 테스트 버튼 & 결과 ====== */}
                <div style={{ marginBottom: 40 }}>
                    <button onClick={callHelloApi} style={{ padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}>
                        🌐 Call Hello API
                    </button>
                    {helloMessage && <p style={{ marginTop: 10, color: 'green' }}>{helloMessage}</p>}
                    {helloError && <p style={{ marginTop: 10, color: 'red' }}>{helloError}</p>}
                </div>
                <form style={styles.form} onSubmit={(e) => { e.preventDefault(); handlePredict(); }}>
                    {Object.keys(formData).map((key) => (
                        <div key={key} style={styles.inputGroup}>
                            <label style={styles.label}>{fieldInfo[key].label}</label>
                            <div style={styles.description}>{fieldInfo[key].description}</div>
                            <div style={styles.inputWrapper}>
                                <button
                                    type="button"
                                    style={styles.stepButton}
                                    onClick={() => handleStepChange(key, -1)}
                                >
                                    –
                                </button>
                                <input
                                    type="number"
                                    step={fieldInfo[key].step}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder={fieldInfo[key].placeholder}
                                />
                                <button
                                    type="button"
                                    style={styles.stepButton}
                                    onClick={() => handleStepChange(key, 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="submit" style={styles.submitButton}>🎧 Predict Genre</button>
                </form>

                {error && <p style={styles.errorText}>{error}</p>}
                {result && (
                    <p style={styles.resultText}>
                        ✅ Predicted Genre: <strong>{result}</strong>
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    h1: {
        fontSize: '3vw',
        fontFamily: 'Noto Sans KR',
        marginTop: '10vh',
        marginBottom: '4vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputGroup: {
        marginBottom: '20px',
        width: '100%',
        maxWidth: '400px',
    },
    label: {
        fontFamily: 'Noto Sans KR',
        fontSize: '1.2rem',
        display: 'block',
        marginBottom: '4px',
        textAlign: 'left',
    },
    description: {
        fontSize: '0.85rem',
        color: '#666',
        marginBottom: '8px',
        fontFamily: 'Noto Sans KR',
        textAlign: 'left',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    stepButton: {
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '5px',
        userSelect: 'none',
        margin: '0 8px',
        transition: 'background-color 0.2s',
    },
    input: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        fontFamily: 'Jua',
        borderRadius: '5px',
        border: '1px solid #ccc',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: 'black',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Noto Sans KR',
        marginTop: '4vh',
        marginBottom: '10vh'
    },
    resultText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1b5e20',
        marginTop: '2vh',
        fontFamily: 'Noto Sans KR'
    },
    errorText: {
        color: 'red',
        fontSize: '1.2rem',
        marginTop: '2vh'
    }
};

export default TestPage2;
