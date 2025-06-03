import React, { useState } from 'react';
import axios from 'axios';

const PlaylistReviewModal = ({ musicId, imageUrl, genre, playlist_music_name, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
        const user_id = localStorage.getItem('userId');
        if (!user_id || !rating || !comment.trim()) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        try {
            console.log('보낼값들' + user_id, musicId, imageUrl, genre, rating, comment, playlist_music_name)
            await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, {
                user_id,
                playlist_music_id: musicId,
                album_image_url: imageUrl,
                genre,
                rating,
                comment,
                playlist_music_name
            });
            alert('리뷰 제출 완료!');
            onClose();
        } catch (err) {
            alert('제출 실패');
            console.error(err);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>리뷰 작성</h2>
                <img src={imageUrl} alt="Album" style={styles.image} />
                <div>
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{ cursor: 'pointer', color: star <= rating ? '#FFD700' : '#ccc', fontSize: '2rem' }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    rows={5}
                    placeholder="리뷰를 입력하세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={styles.textarea}
                />
                <button onClick={handleSubmit} style={styles.button}>제출</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1100,
    },
    modal: {
        background: '#fff', padding: '20px', borderRadius: '10px',
        width: '400px', height: '600px', textAlign: 'center',
    },
    image: {
        width: '80%', borderRadius: '8px',
    },
    textarea: {
        width: '80%', padding: '10px', marginTop: '8px',
        borderRadius: '6px', border: '1px solid #ccc',
        resize: 'none',
    },
    button: {
        marginTop: '15px', padding: '10px 20px',
        backgroundColor: 'white', color: 'black', border: '1px solid black',
        borderRadius: '6px', cursor: 'pointer',
    },
};

export default PlaylistReviewModal;
