import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImageUploader from './ProfileImageUploader';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/${userId}`);
                setUserInfo(res.data);
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <div style={{
            maxWidth: '800px',
            margin: '40px auto',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            backgroundColor: '#fff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '30px',
                color: '#333',
                borderBottom: '2px solid #ddd',
                paddingBottom: '10px'
            }}>
                My Page
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '120px' }}>
                {/* 왼쪽: 프로필 이미지 */}
                <ProfileImageUploader userId={userInfo.userId} />

                {/* 오른쪽: 사용자 정보 */}
                <div style={{ lineHeight: '2', fontSize: '1.1rem', color: '#555' }}>
                    <p><strong>User Name:</strong> {userInfo.userName}</p>
                    <p><strong>User ID:</strong> {userInfo.userId}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Joined:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
