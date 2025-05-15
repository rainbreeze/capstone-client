import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer'; // Material Icons Outlined 스타일

function ViewReviewCommentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { reviewId } = location.state || {};

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [replyInputMap, setReplyInputMap] = useState({}); // 어떤 댓글에 답글창이 열려있는지

    // 댓글 클릭 시 답글 입력창 토글
    const toggleReplyInput = (commentId) => {
        setReplyInputMap((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 해당 댓글의 상태를 반전시켜서 열고 닫음
        }));
    };

    const [replyTexts, setReplyTexts] = useState({});

    // 답글 텍스트 변경 시 상태 업데이트
    const handleReplyChange = (commentId, value) => {
        setReplyTexts((prev) => ({
            ...prev,
            [commentId]: value,
        }));
    };

    // 답글 제출 시
    const handleReplySubmit = (commentId) => {
        const replyContent = replyTexts[commentId];
        console.log(`댓글 ID ${commentId}에 대한 답글: ${replyContent}`);

        // 여기에 답글을 서버로 전송하는 axios 코드 작성 가능
        // 예시: axios.post(`/comment/${commentId}/reply`, { content: replyContent, user_id: ... })

        // 전송 후 입력창 초기화
        setReplyTexts((prev) => ({
            ...prev,
            [commentId]: '',
        }));
        setReplyInputMap((prev) => ({
            ...prev,
            [commentId]: false,
        }));
    };

    const handleWriteCommentClick = (reviewId) => {
        navigate('/writereviewcomment', { state: { reviewId } });
    };

    const handleDeleteComment = async (commentId) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setError('로그인된 사용자 정보가 없습니다.');
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}`, {
                data: { user_id: userId }, // 삭제 요청시 user_id 포함
            });

            setComments((prevComments) =>
                prevComments.filter((comment) => comment.comment_id !== commentId)
            );
        } catch (err) {
            console.error('댓글 삭제 실패:', err);
            setError('댓글 삭제 중 오류가 발생했습니다.');
        }
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

                <div style={styles.reviewIdAndButtonContainer}>
                    <p style={styles.subtitle}>Review ID: {reviewId}</p>
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
                                <div style={styles.commentHeader}>
                                    <p style={styles.commentAuthor}>
                                        <strong>작성자:</strong> {comment.user_id}
                                    </p>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation(); // 삭제 버튼 클릭 시 이벤트 전파 방지
                                            handleDeleteComment(comment.comment_id);
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>

                                <div
                                    style={styles.commentContentWrapper}
                                    onClick={() => toggleReplyInput(comment.comment_id)}
                                >
                                    <p style={styles.commentContent}>{comment.content}</p>
                                    <p style={styles.timestamp}>{new Date(comment.created_at).toLocaleString()}</p>
                                </div>

                                {replyInputMap[comment.comment_id] && (
                                    <div style={styles.replyInputContainer}>
                                        {/* 답글 입력폼 왼쪽에 화살표 아이콘 추가 */}
                                        <span className="material-icons-outlined" style={styles.arrowIcon}>
                                            subdirectory_arrow_right
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="답글을 입력하세요"
                                            value={replyTexts[comment.comment_id] || ''}
                                            onChange={(e) => handleReplyChange(comment.comment_id, e.target.value)}
                                            style={styles.replyInput}
                                        />
                                        <button
                                            style={styles.replyButton}
                                            onClick={() => handleReplySubmit(comment.comment_id)}
                                        >
                                            답글
                                        </button>
                                    </div>
                                )}

                                {/* 답글들 */}
                                {comment.replies && comment.replies.map((reply) => (
                                    <div style={styles.replyTextWrapper} key={reply.reply_id}>
                                        <div style={styles.replyText}>
                                            <span className="material-icons-outlined">
                                                subdirectory_arrow_right
                                            </span>
                                            {reply.content}
                                        </div>
                                    </div>
                                ))}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
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
    commentHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentAuthor: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    commentContentWrapper: {
        cursor: 'pointer', // 클릭 가능하도록 설정
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
    replyInputContainer: {
        marginTop: '10px', // 댓글과 답글 입력창 사이에 공간을 추가
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: '#f1f1f1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px', // 입력창과 버튼 사이 간격 추가
    },
    replyInput: {
        flex: 1,
        padding: '8px 12px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    replyButton: {
        backgroundColor: '#1ed760',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: 'Jua',
    },
    replyTextWrapper: {
        marginLeft: '20px', // 답글은 왼쪽에 들여쓰기 추가
        marginTop: '10px', // 답글 간격
    },
    replyText: {
        fontSize: '1rem', // 답글 폰트 크기
        color: '#555', // 답글 색상
    },
    arrowIcon: {
        fontSize: '1.2rem', // 화살표 아이콘 크기
        color: 'black', // 화살표 색상
        marginRight: '10px', // 화살표와 답글 사이 간격
    },
};

export default ViewReviewCommentPage;
