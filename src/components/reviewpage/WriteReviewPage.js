import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

function WriteReviewPage() {
    const location = useLocation();
    const { musicId, imageUrl } = location.state || {};

    const [genre, setGenre] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (musicId) {
            const fetchGenre = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlistMusic/genre/${musicId}`);
                    setGenre(response.data.genre);
                }
                catch (err) {
                    console.error("장르 불러오기 실패");
                    setError('장르 정보 불러오기 실패.');
                }
            };

            fetchGenre();
        }
    }, [musicId]);
    return (
        <div>
            <h1>리뷰 작성 페이지</h1>
            {musicId && (
                <div>
                    <p>선택한 음악 ID: {musicId}</p>
                    {imageUrl && (
                        <img src={imageUrl} alt={`Music ${musicId}`} style={{ width: 200, height: 200 }} />
                    )}
                </div>
            )}
            {genre && <p>장르: {genre}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default WriteReviewPage;
