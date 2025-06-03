// ReviewCommentModal.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewCommentModal({ reviewId, onClose }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyInputMap, setReplyInputMap] = useState({});
    const [replyTexts, setReplyTexts] = useState({});

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
                                <div style={styles.commentHeader}>
                                    <strong>{comment.user_id}</strong>
                                    <button onClick={() => handleDeleteComment(comment.comment_id)} style={styles.deleteButton}>삭제</button>
                                </div>
                                <p>{comment.content}</p>
                                <p style={styles.timestamp}>{new Date(comment.created_at).toLocaleString()}</p>

                                <button onClick={() => toggleReplyInput(comment.comment_id)} style={styles.replyToggle}>답글</button>

                                {replyInputMap[comment.comment_id] && (
                                    <div style={styles.replyInputContainer}>
                                        <input
                                            value={replyTexts[comment.comment_id] || ''}
                                            onChange={(e) => handleReplyChange(comment.comment_id, e.target.value)}
                                            placeholder="답글을 입력하세요"
                                            style={styles.replyInput}
                                        />
                                        <button onClick={() => handleReplySubmit(comment.comment_id)} style={styles.submitReplyButton}>작성</button>
                                    </div>
                                )}

                                {comment.replies?.map((reply) => (
                                    <div key={reply.reply_id} style={styles.reply}>
                                        ↳ <strong>{reply.user_id}</strong>: {reply.content}
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

const styles = {
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
        width: '80%',
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
    },
    deleteButton: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    replyToggle: {
        marginTop: 5,
        background: '#3498db',
        color: 'white',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    replyInputContainer: {
        marginTop: 8,
        display: 'flex',
        gap: 5,
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
        paddingLeft: 15,
        color: '#555',
        fontSize: '0.95rem',
    },
    timestamp: {
        fontSize: '0.8rem',
        color: '#999',
    },
    error: {
        color: 'red',
    },
};

export default ReviewCommentModal;
