import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

function ViewReviewCommentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { reviewId } = location.state || {};

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleWriteCommentClick = (reviewId) => {
        navigate('/writereviewcomment', { state: { reviewId } });
    };

    useEffect(() => {
        if (!reviewId) {
            setError('리뷰 ID가 없습니다.');
            setLoading(false);
            return;
        }

        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`);
                setComments(response.data);
            } catch (err) {
                console.error('댓글 불러오기 실패:', err);
                setError('댓글을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [reviewId]);

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h2 style={styles.title}>댓글 목록</h2>

                {/* Review ID와 댓글 작성 버튼을 동일한 행에 배치 */}
                <div style={styles.reviewIdAndButtonContainer}>
                    <p style={styles.subtitle}>Review ID: {reviewId}</p>

                    {/* 댓글 작성 버튼 */}
                    <button style={styles.writeButton} onClick={() => handleWriteCommentClick(reviewId)}>
                        댓글 작성
                    </button>
                </div>

                {loading ? (
                    <p>불러오는 중...</p>
                ) : error ? (
                    <p style={styles.error}>{error}</p>
                ) : comments.length === 0 ? (
                    <p>아직 등록된 댓글이 없습니다.</p>
                ) : (
                    <ul style={styles.commentList}>
                        {comments.map((comment) => (
                            <li key={comment.comment_id} style={styles.commentItem}>
                                <p><strong>작성자:</strong> {comment.user_id}</p>
                                <p style={styles.commentContent}>{comment.content}</p>
                                <p style={styles.timestamp}>{new Date(comment.created_at).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        padding: '40px 20vw',
        minHeight: '70vh',
        fontFamily: 'Jua',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1.2rem',
        marginBottom: '10px',
        color: '#555',
    },
    reviewIdAndButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between', // 좌우 공간을 균등하게 배치
        alignItems: 'center',
        width: '100%', // 부모 컨테이너에 맞게 채움
    },
    writeButton: {
        padding: '10px 20px',
        backgroundColor: '#1ed760',
        color: '#fff',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'Jua',
    },
    error: {
        color: 'red',
        fontSize: '1.1rem',
    },
    commentList: {
        listStyle: 'none',
        padding: 0,
    },
    commentItem: {
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    commentContent: {
        fontSize: '1.2rem',
        marginTop: '8px',
        marginBottom: '5px',
    },
    timestamp: {
        fontSize: '0.9rem',
        color: '#888',
    },
};

export default ViewReviewCommentPage;
