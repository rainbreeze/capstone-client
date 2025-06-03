import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';

function ViewReviewPage() {
    const [reviews, setReviews] = useState([]);  // 리뷰 상태를 빈 배열로 초기화
    const [error, setError] = useState(null);  // 에러 상태
    const [likedReviews, setLikedReviews] = useState([]);
    const navigate = useNavigate();

    const handleCommentClick = (reviewId) => {
        navigate('/viewreviewcomment', { state: { reviewId } });
    };

    const handleLike = async (reviewId) => {
        const alreadyLiked = likedReviews.includes(reviewId);

        try {
            const endpoint = alreadyLiked ? 'unLike' : 'like';

            await axios.post(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}/${endpoint}`);

            // 응답 후 리뷰 목록 업데이트
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`);
            setReviews(response.data);

            // 좋아요 상태 토글
            setLikedReviews((prev) =>
                alreadyLiked
                    ? prev.filter((id) => id !== reviewId)
                    : [...prev, reviewId]
            );
        } catch (err) {
            console.error('좋아요 처리 실패:', err);
            setError('좋아요 처리 중 문제가 발생했습니다.');
        }
    };

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
            <div style={styles.imageContainer}>
                <img
                    src="images/review/top_banner.png"
                    alt="헤더 배경 이미지"
                    style={styles.headerImage}
                />
                <div style={styles.overlayText}>
                    음악 위에 남겨진 마음들, <br/>
                    천천히 읽어보세요.
                </div>
                <div style={styles.listenHereText}>감상 가능한 곳</div>
                <div style={styles.logoContainer}>
                    <img src="images/playlist/logo1.png" alt="YouTube" style={styles.logo} />
                    <img src="images/playlist/logo2.png" alt="Spotify" style={styles.logo} />
                </div>
            </div>
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

                                    {/* 공통 하단 섹션 */}
                                    <div style={styles.bottomSection}>
                                        <div style={styles.bottomLeftSection}>
                                            {/* 좋아요 버튼 */}
                                            <button
                                                style={
                                                    likedReviews.includes(review.review_id)
                                                        ? styles.likeButtonActive
                                                        : styles.likeButton
                                                }
                                                onClick={() => handleLike(review.review_id)}
                                            >
                                                <span className="material-icons-outlined">thumb_up</span>
                                            </button>

                                            {/* 댓글 버튼 */}
                                            <button
                                                style={styles.likeButton}
                                                onClick={() => handleCommentClick(review.review_id)}
                                            >
                                                <span className="material-icons-outlined">chat</span>
                                            </button>
                                        </div>
                                        <div style={styles.bottomRight}>
                                            <p style={styles.text}>👍 {review.like_count}</p>
                                            <p style={styles.text}>💬 {review.comment_count}</p>
                                        </div>
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
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '48vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        userSelect: 'none',
        pointerEvents: 'none',
    },
    overlayText: {
        position: 'absolute',
        bottom: '8vh',
        left: '12vw',
        color: 'white',
        fontSize: '2vw',
        fontWeight: '600',
        textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
        lineHeight: '1.4',
        maxWidth: '60vw',
        fontFamily: 'Noto Sans KR',
    },
    listenHereText: {
        position: 'absolute',
        bottom: '95px',
        right: '30px',
        color: 'rgba(110, 110, 110, 0.8)',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'Noto Sans KR',
        userSelect: 'none',
    },
    logoContainer: {
        position: 'absolute',
        bottom: '15px',
        right: '30px',
        display: 'flex',
        gap: '15px',
    },
    logo: {
        width: '80px',
        height: '80px',
        objectFit: 'contain',
        cursor: 'pointer',
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))',
    },
    container: {
        padding: '0 10vw',
        textAlign: 'center',
        backgroundColor: 'transparent',
        minHeight: '80vh',
        marginTop: '8vh'
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

    bottomSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 'auto',
        width: '100%',
    },
    bottomLeftSection: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '10px',
    },
    bottomRight: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '15px',
    },

    likeButton: {
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Jua',
        fontSize: '1.2rem',
        padding: '6px 12px',
        borderRadius: '10px',
        cursor: 'pointer',
        border: '3px solid black',
        transition: 'all 0.3s ease',
        display: 'flex', // Flexbox 활성화
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'center', // 세로 중앙 정렬
        height: '40px', // 버튼 높이를 지정
        width: '40px', // 버튼 너비를 지정
    },

    likeButtonActive: {
        backgroundColor: '#f1c40f',
        color: 'white',
        fontFamily: 'Jua',
        fontSize: '1.2rem',
        padding: '6px 12px',
        border: '1px solid white',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex', // Flexbox 활성화
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'center', // 세로 중앙 정렬
        height: '40px', // 버튼 높이를 지정
        width: '40px', // 버튼 너비를 지정
    },
};

export default ViewReviewPage;
