import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

function WriteReviewPage() {
    const location = useLocation();
    const { musicId, imageUrl } = location.state || {};

    const [genre, setGenre] = useState(null);
    const [error, setError] = useState(null);

    // 🔽 추가: 별점과 코멘트 상태
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (musicId) {
            const fetchGenre = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlistMusic/genre/${musicId}`);
                    setGenre(response.data.genre);
                } catch (err) {
                    console.error('장르 불러오기 실패:', err);
                    setError('장르 정보 불러오기 실패.');
                }
            };
            fetchGenre();
        }
    }, [musicId]);

    // 🔽 리뷰 제출 핸들러 (임시로 console 출력)
    const handleSubmitReview = async () => {
        const user_id = localStorage.getItem('userId'); // 로컬 스토리지에서 가져오기
    
        if (!user_id) {
            alert('로그인이 필요합니다.');
            return;
        }
    
        if (!rating || !comment.trim()) {
            alert('별점과 리뷰를 모두 작성해주세요.');
            return;
        }
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, {
                user_id,
                playlist_music_id: musicId,
                album_image_url: imageUrl,
                genre,
                rating,
                comment,
            });
    
            console.log('리뷰 등록 응답:', response.data);
            alert('리뷰가 성공적으로 제출되었습니다!');
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
            alert('리뷰 제출에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.h1}>리뷰 작성 페이지</h1>

                {musicId ? (
                    <div style={styles.contentBox}>
                        <p style={styles.text}><strong>선택한 음악 ID:</strong> {musicId}</p>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={`Music ${musicId}`}
                                style={styles.albumImage}
                            />
                        )}
                        {genre && <p style={styles.text}><strong>장르:</strong> {genre}</p>}
                        {error && <p style={styles.errorText}>{error}</p>}

                        {/* 🔽 별점 입력 */}
                        <div style={styles.text}>
                            <strong>별점:</strong>{' '}
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{
                                        cursor: 'pointer',
                                        color: star <= rating ? '#FFD700' : '#ccc',
                                        fontSize: '2rem',
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* 🔽 코멘트 입력 */}
                        <div style={{ marginTop: '20px' }}>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="리뷰를 입력해주세요"
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '1rem',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontFamily: 'inherit',
                                    resize: 'none',
                                }}
                            />
                        </div>

                        {/* 🔽 제출 버튼 */}
                        <button
                            onClick={handleSubmitReview}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                fontSize: '1.1rem',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            리뷰 제출
                        </button>
                    </div>
                ) : (
                    <p style={styles.errorText}>음악 정보가 없습니다.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        padding: '0 10vw',
        textAlign: 'center',
        backgroundColor: 'transparent',
        minHeight: '80vh',
    },
    h1: {
        fontSize: '3rem',
        fontFamily: 'Jua',
        color: '#333',
        marginBottom: '30px',
        fontWeight: 'bold',
    },
    contentBox: {
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    text: {
        fontSize: '1.2rem',
        marginBottom: '15px',
        color: '#333',
        fontFamily: 'Jua',
    },
    albumImage: {
        width: '200px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    errorText: {
        color: 'red',
        fontSize: '1rem',
        marginTop: '10px',
    },
};

export default WriteReviewPage;
