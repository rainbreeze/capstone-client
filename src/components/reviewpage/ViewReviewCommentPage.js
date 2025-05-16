import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

function ViewReviewCommentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { reviewId } = location.state || {}; // URL로부터 reviewId를 가져옴

    const [comments, setComments] = useState([]); // 댓글 리스트 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const [replyInputMap, setReplyInputMap] = useState({}); // 댓글별 답글 입력창 열림 상태
    const [replyTexts, setReplyTexts] = useState({}); // 답글 입력 상태

    // 댓글 클릭 시 답글 입력창 토글
    const toggleReplyInput = (commentId) => {
        setReplyInputMap((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 해당 댓글에 대해 입력창을 열거나 닫음
        }));
    };

    // 답글 텍스트 변경 시 상태 업데이트
    const handleReplyChange = (commentId, value) => {
        setReplyTexts((prev) => ({
            ...prev,
            [commentId]: value,
        }));
    };

    const handleReplySubmit = async (commentId) => {
        const replyContent = replyTexts[commentId];
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setError('로그인된 사용자 정보가 없습니다.');
            return;
        }

        if (!replyContent.trim()) {
            setError('답글을 작성해주세요.');
            return;
        }

        try {
            // 답글 등록 API 수정된 경로 사용
            await axios.post(`${process.env.REACT_APP_API_URL}/reply/${reviewId}/reply`, {
                comment: replyContent,
                user_id: userId,
                parent_comment_id: commentId,
            });

            // 답글 작성 후 전체 댓글 다시 불러오기
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`);
            setComments(response.data);

            setReplyTexts(prev => ({
                ...prev,
                [commentId]: '',
            }));
            setReplyInputMap(prev => ({
                ...prev,
                [commentId]: false,
            }));
        } catch (err) {
            console.error('답글 제출 실패:', err);
            setError('답글 제출 중 오류가 발생했습니다.');
        }
    };

    // 댓글 작성 페이지로 이동
    const handleWriteCommentClick = (reviewId) => {
        navigate('/writereviewcomment', { state: { reviewId } });
    };

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setError('로그인된 사용자 정보가 없습니다.');
            return;
        }

        try {
            // 댓글 삭제 요청
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

        const fetchCommentsWithReplies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`);
                // 백엔드에서 replies가 포함되어 오므로 별도 가공 불필요
                setComments(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('댓글 및 답글 불러오기 실패:', err);
                setError('댓글을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchCommentsWithReplies();
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
                                            e.stopPropagation();
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

                                {comment.replies && Array.isArray(comment.replies) && comment.replies.map((reply) => {
                                    console.log('답글 객체:', reply); // 👈 여기 추가
                                    return (
                                        <div style={styles.replyTextWrapper} key={reply.reply_id}>
                                            <div style={styles.replyText}>
                                                <span className="material-icons-outlined" style={{ fontSize: '1.2rem', color: 'black', marginRight: '10px' }}>
                                                    subdirectory_arrow_right
                                                </span>
                                                {/* reply_id를 표시 */}
                                                <strong>{reply.user_id}</strong> : {reply.content || '(내용 없음)'}
                                            </div>
                                        </div>
                                    );
                                })}

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
        cursor: 'pointer',
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
        marginTop: '10px',
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: '#f1f1f1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
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
        marginLeft: '20px',
        marginTop: '10px',
    },
    replyText: {
        fontSize: '1rem',
        color: '#555',
    },
    arrowIcon: {
        fontSize: '1.2rem',
        color: 'black',
        marginRight: '10px',
    },
};

export default ViewReviewCommentPage;
