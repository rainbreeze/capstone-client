import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/mypage', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserInfo(res.data);
            } catch (err) {
                console.error('Failed to fetch user info:', err.response ? err.response.data : err.message);
            }
        };

        fetchUserInfo();
    }, []);


    if (!userInfo) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Page</h2>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>User ID:</strong> {userInfo.userId}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Joined:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default MyPage;
