import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestPage2 = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // .env에서 설정한 API URL 사용
        const apiUrl = `${process.env.REACT_APP_API_URL}/genreapi/hello`;

        axios.get(apiUrl)
            .then(res => setMessage(res.data.message))
            .catch(err => setError('API 호출 실패: ' + err.message));
    }, []);

    return (
        <div>
            <h1>Express → FastAPI /hello 테스트</h1>
            {error ? <p>{error}</p> : <p>응답 메시지: {message}</p>}
        </div>
    );
};

export default TestPage2;
