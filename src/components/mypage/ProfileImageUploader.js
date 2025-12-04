import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileImageUploader = ({ userId, currentImage }) => {
    // public 폴더에 있는 기본 이미지 파일명 (없다면 해당 경로에 이미지를 넣어주세요)
    const DEFAULT_IMAGE = '/default-profile.png';

    const [imageSrc, setImageSrc] = useState(DEFAULT_IMAGE);

    useEffect(() => {
        // 전달받은 이미지가 있으면 설정, 없으면 기본 이미지 유지
        if (currentImage) {
            // http로 시작하면(카카오 등) 그대로 사용, 아니면 서버 uploads 경로 사용
            const fullUrl = currentImage.startsWith('http')
                ? currentImage
                : `${process.env.REACT_APP_API_URL}/uploads/${currentImage}`;
            setImageSrc(fullUrl);
        } else {
            setImageSrc(DEFAULT_IMAGE);
        }
    }, [currentImage]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            // 이미지 업로드 요청 (API 경로는 서버 라우트에 맞게 조정 필요)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/${userId}/profileImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const newImageUrl = response.data.imageUrl;
                const fullUrl = `${process.env.REACT_APP_API_URL}/uploads/${newImageUrl}`;

                // 1. 현재 컴포넌트 이미지 즉시 변경
                setImageSrc(fullUrl);

                // 2. 헤더 등 전역 반영을 위해 로컬 스토리지 갱신
                localStorage.setItem('profileImage', newImageUrl);

                // 3. 헤더의 이미지가 갱신되도록 페이지 새로고침
                window.location.reload();
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <UploaderContainer>
            <ImageWrapper>
                <ProfileImg
                    src={imageSrc}
                    alt="Profile"
                    // 이미지 로드 실패 시(404 등) 기본 이미지로 대체하는 안전장치
                    onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                />
            </ImageWrapper>
            {/*}
            <UploadButton htmlFor="imageUpload">
                이미지 변경
            </UploadButton>
            <HiddenInput
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
            />
            */}
        </UploaderContainer>
    );
};

export default ProfileImageUploader;

// 스타일 컴포넌트
const UploaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const ImageWrapper = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #e0e0e0;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    background-color: #f8f9fa; /* 이미지가 없을 때 배경색 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const UploadButton = styled.label`
    cursor: pointer;
    padding: 8px 20px;
    background-color: #555;
    color: white;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);

    &:hover {
        background-color: #333;
        transform: translateY(-2px);
    }
`;

const HiddenInput = styled.input`
    display: none;
`;