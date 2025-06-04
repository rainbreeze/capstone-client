// ReviewCommentModal.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewCommentModal({ reviewId, onClose }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyInputMap, setReplyInputMap] = useState({});
    const [replyTexts, setReplyTexts] = useState({});
    const [newComment, setNewComment] = useState('');

    // 프로필 이미지 기본값 함수
    const getProfileImage = (url) => {
        if (!url) return '/images/header/profile.png';
        return url;
    };

    const handleNewCommentSubmit = async () => {
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userProfile = null;

        if (!userId) {
            setError('로그인된 사용자 정보가 없습니다.');
            return;
        }

        if (!newComment.trim()) {
            setError('댓글을 작성해주세요.');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`, {
                comment: newComment,
                user_id: userId,
                parrent_id: null,
                user_name: userName,
                user_profile: userProfile
            });

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`);
            setComments(response.data);
            setNewComment('');
        } catch (err) {
            console.error('댓글 작성 실패:', err);
            setError('댓글 작성 중 오류가 발생했습니다.');
        }
    };

    const toggleReplyInput = (commentId) => {
        setReplyInputMap(prev => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleReplyChange = (commentId, value) => {
        setReplyTexts(prev => ({
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
            await axios.post(`${process.env.REACT_APP_API_URL}/reply/${reviewId}/reply`, {
                comment: replyContent,
                user_id: userId,
                parent_comment_id: commentId,
            });

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`);
            setComments(response.data);
            setReplyTexts(prev => ({ ...prev, [commentId]: '' }));
            setReplyInputMap(prev => ({ ...prev, [commentId]: false }));
        } catch (err) {
            console.error('답글 제출 실패:', err);
            setError('답글 제출 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('로그인된 사용자 정보가 없습니다.');
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}`, {
                data: { user_id: userId },
            });

            setComments(prevComments => prevComments.filter(c => c.comment_id !== commentId));
        } catch (err) {
            console.error('댓글 삭제 실패:', err);
            setError('댓글 삭제 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
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
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                <h2 style={styles.title}>댓글 목록</h2>

                {loading ? (
                    <p>불러오는 중...</p>
                ) : error ? (
                    <p style={styles.error}>{error}</p>
                ) : (
                    <ul style={styles.commentList}>
                        {comments.map((comment) => (
                            <li key={comment.comment_id} style={styles.commentItem}>
                                {/* 댓글 헤더: 프로필 이미지, 이름, 날짜, 삭제/답글 버튼 */}
                                <div style={styles.commentHeader}>
                                    <div style={styles.leftHeader}>
                                        <img
                                            src={getProfileImage(comment.user_profile)}
                                            alt="profile"
                                            style={styles.profileImage}
                                        />
                                        <strong style={styles.userName}>{comment.user_name}</strong>
                                        <span style={styles.timestamp}>{new Date(comment.created_at).toLocaleString()}</span>
                                    </div>

                                    <div style={styles.rightHeader}>
                                        <button
                                            onClick={() => toggleReplyInput(comment.comment_id)}
                                            style={styles.iconButton}
                                            title="답글"
                                        >
                                            ＋
                                        </button>
                                        <button
                                            onClick={() => handleDeleteComment(comment.comment_id)}
                                            style={styles.iconButton}
                                            title="삭제"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>

                                {/* 댓글 내용 */}
                                <p style={styles.commentContent}>{comment.content}</p>

                                {/* 답글 입력창 */}
                                {replyInputMap[comment.comment_id] && (
                                    <div style={styles.replyInputContainer}>
                                        <input
                                            value={replyTexts[comment.comment_id] || ''}
                                            onChange={(e) => handleReplyChange(comment.comment_id, e.target.value)}
                                            placeholder="답글을 입력하세요"
                                            style={styles.replyInput}
                                        />
                                        <button onClick={() => handleReplySubmit(comment.comment_id)} style={styles.submitReplyButton}>
                                            작성
                                        </button>
                                    </div>
                                )}

                                {/* 답글 리스트 */}
                                {comment.replies?.map((reply) => (
                                    <div key={reply.reply_id} style={styles.reply}>
                                        ↳ <strong>{reply.user_id}</strong>: {reply.content}
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                )}

                {/* 새 댓글 작성 */}
                <div style={styles.newCommentContainer}>
                    <div style={styles.newCommentInputWrapper}>
                        <textarea
                            style={styles.newCommentInput}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <button onClick={handleNewCommentSubmit} style={styles.newCommentIconButton} title="댓글 작성">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    newCommentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },

    newCommentInputWrapper: {
        position: 'relative',
        width: '100%',
    },

    newCommentInput: {
        width: '100%',
        minHeight: 80,
        padding: 8,
        paddingRight: 40, // 오른쪽 버튼 공간 확보
        borderRadius: 6,
        border: '1px solid #ccc',
        fontSize: '0.95rem',
        resize: 'vertical',
        boxSizing: 'border-box',
    },

    newCommentIconButton: {
        position: 'absolute',
        right: '1.5vw',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '2.5vw',
        height: '2.5vw',
        borderRadius: '50%',
        backgroundColor: 'white',
        border: 'none',
        color: '#999',
        fontSize: '2vw',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    },

    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },

    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '50%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        border: 'none',
        background: 'transparent',
        fontSize: '1.5rem',
        cursor: 'pointer',
    },

    title: {
        fontSize: '1.5rem',
        marginBottom: 10,
    },

    commentList: {
        listStyle: 'none',
        padding: 0,
    },

    commentItem: {
        padding: 10,
        borderBottom: '1px solid #ccc',
    },

    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    leftHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },

    rightHeader: {
        display: 'flex',
        gap: 6,
    },

    profileImage: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover',
        backgroundColor: '#eee',
    },

    userName: {
        fontWeight: 'bold',
    },

    timestamp: {
        fontSize: '0.7rem',
        color: '#999',
        marginLeft: 10,
    },

    iconButton: {
        background: 'transparent',
        border: 'none',
        color: '#888',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: 2,
        lineHeight: 1,
    },

    commentContent: {
        marginTop: 8,
        marginLeft: 50, // 프로필 이미지 공간 맞추기
    },

    replyInputContainer: {
        marginTop: 8,
        display: 'flex',
        gap: 5,
        marginLeft: 50,
    },

    replyInput: {
        flex: 1,
        padding: 5,
        border: '1px solid #ccc',
        borderRadius: '4px',
    },

    submitReplyButton: {
        background: '#1abc9c',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },

    reply: {
        marginTop: 6,
        paddingLeft: 65,
        color: '#555',
        fontSize: '0.95rem',
    },

    error: {
        color: 'red',
    },
};

export default ReviewCommentModal;
