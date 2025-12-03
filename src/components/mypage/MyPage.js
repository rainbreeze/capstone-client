import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import ProfileImageUploader from './ProfileImageUploader';
import Header from '../common/Header';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) return;

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/${userId}`);
                setUserInfo(res.data);
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) return (
        <PageWrapper>
            <Header />
            <MainContainer>
                <LoadingText>Loading...</LoadingText>
            </MainContainer>
        </PageWrapper>
    );

    return (
        <PageWrapper>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
                `}
            </style>

            <Header />

            <MainContainer>
                <BackgroundShapes>
                    <Shape />
                    <Shape />
                    <Shape />
                </BackgroundShapes>

                <GlassContainer>
                    <Title>MYPAGE</Title>

                    <ContentWrapper>
                        <ProfileSection>
                            <ProfileImageUploader
                                userId={userInfo.userId}
                                currentImage={userInfo.profileImage}
                            />
                        </ProfileSection>

                        <InfoSection>
                            <InfoGroup>
                                <Label>User Name</Label>
                                <InfoValue>{userInfo.userName}</InfoValue>
                            </InfoGroup>

                            <InfoGroup>
                                <Label>User ID</Label>
                                <InfoValue>{userInfo.userId}</InfoValue>
                            </InfoGroup>

                            <InfoGroup>
                                <Label>Joined Date</Label>
                                <InfoValue>
                                    {new Date(userInfo.createdAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </InfoValue>
                            </InfoGroup>
                        </InfoSection>
                    </ContentWrapper>
                </GlassContainer>
            </MainContainer>
        </PageWrapper>
    );
};

export default MyPage;

// ========== Animations ==========

const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
  100% { transform: translate(0, 0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ========== Styled Components ==========

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #191414;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
`;

const MainContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  /* [수정 1] 상단 패딩 축소 (8vh -> 5vh) */
  padding: 5vh 20px 8vh 20px;

  background: radial-gradient(circle at 50% -20%, #2a2a2a, #191414);
  overflow: hidden;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 10;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, rgba(0,0,0,0) 70%);
  animation: ${float} 10s infinite ease-in-out;
  opacity: 0.6;

  &:nth-child(1) { width: 600px; height: 600px; top: -100px; left: -100px; animation-duration: 12s; }
  &:nth-child(2) { width: 400px; height: 400px; bottom: 50px; right: -50px; animation-duration: 15s; animation-delay: 1s; }
  &:nth-child(3) { width: 300px; height: 300px; top: 30%; right: 20%; animation-duration: 14s; animation-delay: 2s; }
`;

const GlassContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 800px;

  /* [수정 2] 내부 상단 패딩 축소 (50px -> 30px) */
  padding: 30px 40px 50px 40px;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideUp} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media (max-width: 768px) {
    padding: 30px 20px;
    max-width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 50px;
  letter-spacing: -1px;
  border-bottom: 2px solid rgba(29, 185, 84, 0.5);
  padding-bottom: 10px;

  /* [수정 3] 상단 마진 제거 */
  margin-top: 25px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const ProfileSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoSection = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 700;
  margin-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InfoValue = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-weight: 400;

  cursor: default;
  transition: all 0.3s ease;
  
`;