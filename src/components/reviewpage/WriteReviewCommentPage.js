// WriteReviewComment.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

function WriteReviewComment() {
    const user_id = localStorage.getItem('userId');
    const location = useLocation();
    const navigate = useNavigate();
    const { reviewId } = location.state || {};
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const parrent_id = null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/comment/${reviewId}/comment`, {
                comment,
                user_id,
                parrent_id
            });

            // 작성 후 리뷰 목록 페이지로 이동
            navigate('/viewreviewcomment', { state: { reviewId } });

        } catch (err) {
            console.error('댓글 작성 실패:', err);
            setError('댓글 작성 중 오류가 발생했습니다.');
        }
    };

    if (!reviewId) {
        return <p style={styles.error}>잘못된 접근입니다. 리뷰 ID가 없습니다.</p>;
    }

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h2 style={styles.title}>댓글 작성</h2>
                <p>Review Id: {reviewId}</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <textarea
                        style={styles.textarea}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        required
                    />
                    <button type="submit" style={styles.submitButton}>작성 완료</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
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
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    textarea: {
        minHeight: '120px',
        padding: '10px',
        fontSize: '1.2rem',
        marginBottom: '20px',
        borderRadius: '8px',
        border: '1px solid #ccc',
    },
    submitButton: {
        fontSize: '1.2rem',
        padding: '10px',
        backgroundColor: '#1ed760',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default WriteReviewComment;
