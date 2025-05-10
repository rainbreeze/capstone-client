import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

function ViewReviewPage() {
    const [reviews, setReviews] = useState([]);  // 리뷰 상태를 빈 배열로 초기화
    const [error, setError] = useState(null);  // 에러 상태

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`);

                // 응답이 배열인지 확인하고 배열로 설정
                if (Array.isArray(response.data)) {
                    setReviews(response.data);  // 응답이 배열이면 그 데이터를 상태에 저장
                } else {
                    throw new Error("리뷰 데이터 형식이 올바르지 않습니다.");
                }
            } catch (err) {
                console.error('전체 리뷰 조회 실패:', err);
                setError('리뷰를 불러오는 데 실패했습니다.');
            }
        };

        fetchAllReviews();  // 컴포넌트가 마운트되면 전체 리뷰를 가져옴
    }, []);  // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때 한 번만 호출

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.h1}>전체 리뷰</h1>

                {/* 리뷰가 없다면 안내 */}
                {reviews.length === 0 ? (
                    <p style={styles.text}>리뷰가 아직 없습니다.</p>
                ) : (
                    <div>
                        {reviews.map((review) => (
                            <div key={review.review_id} style={styles.reviewCard}>
                                {/* 좌측: 이미지 및 좌측 하단 정보 */}
                                <div style={styles.leftSection}>
                                    <img src={review.album_image_url} alt="Album" style={styles.albumImage} />
                                    <div style={styles.bottomLeft}>
                                        <p style={styles.text}><strong>장르:</strong> {review.genre}</p>
                                        <p style={styles.dateText}><strong>작성일:</strong> {new Date(review.created_at).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* 우측: 정보 */}
                                <div style={styles.rightSection}>
                                    {/* user_id (우측 상단) */}
                                    <div style={styles.userId}>
                                        <p style={styles.text}><strong>작성자 ID:</strong> {review.user_id}</p>
                                    </div>

                                    {/* 별점 (우측 섹션의 좌측 상단) */}
                                    <div style={styles.topLeft}>
                                        <p style={styles.rating}><strong>{'★'.repeat(review.rating)}</strong></p>
                                    </div>

                                    {/* 코멘트 중앙 */}
                                    <div style={styles.middleRight}>
                                        <p style={styles.text}><strong></strong> {review.comment}</p>
                                    </div>

                                    {/* 좋아요 수 / 댓글 수 우측 하단 */}
                                    <div style={styles.bottomRight}>
                                        <p style={styles.text}>👍 {review.like_count}</p>
                                        <p style={styles.text}>💬 {review.comment_count}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 에러 메시지 */}
                {error && <p style={styles.errorText}>{error}</p>}
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
    reviewCard: {
        display: 'flex',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        justifyContent: 'space-between',
    },
    
    leftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        justifyContent: 'space-between',
    },
    
    albumImage: {
        width: '180px',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '10px',
    },
    
    bottomLeft: {
        textAlign: 'center',
    },
    
    dateText: {
        fontSize: '0.8rem',
        color: '#888',
    },
    
    rightSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: '20px',
        position: 'relative',
    },
    
    userId: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: '10px',
        marginRight: '10px',
    },
    
    topLeft: {
        position: 'absolute',
        top: '0',
        left: '0',
    },
    
    rating: {
        fontSize: '1.5rem',
        color: '#f39c12',  // 노란색으로 변경
        fontFamily: 'Jua',
    },
    
    middleRight: {
        textAlign: 'left',
        marginTop: '50px', // 별점 아래로 공간 확보
    },
    
    bottomRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        marginTop: 'auto',
    },
};

export default ViewReviewPage;
