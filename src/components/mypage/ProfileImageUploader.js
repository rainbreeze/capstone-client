import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileImageUploader = ({ userId }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/${userId}`);
                const imageFileName = res.data.profileImage;

                if (imageFileName) {
                    const url = imageFileName.startsWith('/uploads')
                        ? `${process.env.REACT_APP_API_URL}${imageFileName}`
                        : `${process.env.REACT_APP_API_URL}/uploads/${imageFileName}`;
                    setPreviewUrl(url);
                } else {
                    setPreviewUrl('/default-profile.png'); // public 폴더 기본 이미지
                }
            } catch (err) {
                console.error('Error loading profile image:', err);
                setPreviewUrl('/default-profile.png');
            }
        };

        fetchProfileImage();
    }, [userId]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/${userId}/profile-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('프로필 이미지가 업로드되었습니다.');
        } catch (err) {
            console.error('Upload failed:', err);
            alert('업로드에 실패했습니다.');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Profile"
                    style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '10px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                    }}
                />
            )}

            <div>
                {/* 숨긴 파일 input */}
                <input
                    type="file"
                    accept="image/*"
                    id="profileImageInput"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <br />
                {/* 라벨을 버튼처럼 스타일링 */}
                <label
                    htmlFor="profileImageInput"
                    style={{
                        marginTop: '10px',
                        padding: '6px 12px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.83rem',
                    }}
                >
                    이미지 고르기
                </label>

                <br />

                <button
                    onClick={handleUpload}
                    style={{
                        marginTop: '10px',
                        padding: '6px 12px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    이미지 업로드
                </button>
            </div>
        </div>
    );
};

export default ProfileImageUploader;