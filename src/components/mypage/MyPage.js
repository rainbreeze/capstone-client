import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const UserId = localStorage.getItem('userId');  // localStorage에서 userId 가져오기
                console.log(UserId);
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/${UserId}`);
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
            <p><strong>User Name:</strong> {userInfo.userName}</p>
            <p><strong>User ID:</strong> {userInfo.userId}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Joined:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default MyPage;
