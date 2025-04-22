import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 공지사항 리스트
const notices = [
    "[당첨자 발표] 전자영수증 이벤트",
    "크리스마스 & 연말연시 매장 영업시간 변경 안내",
    "[당첨자 발표] 커피 영수증 이벤트",
    "애플리케이션 버전 업데이트 안내",
    "[당첨자 발표] 전자영수증 이벤트",
    "크리스마스 & 연말연시 매장 영업시간 변경 안내",
    "커피 프로모션",
    "업데이트 안내"
];

const NoticeSection = () => {
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
        }, 3000); // 3초마다 슬라이딩

        return () => clearInterval(intervalId); // cleanup
    }, []);

    return (
        <Bar>
            <NoticeText>공지사항</NoticeText>
            <NoticeWrapper>
                <NoticeContainer style={{ transform: `translateY(-${currentNoticeIndex * 45}px)` }}>
                    {notices.map((notice, index) => (
                        <NoticeItem key={index}>{notice}</NoticeItem>
                    ))}
                </NoticeContainer>
            </NoticeWrapper>
        </Bar>
    );
};

export default NoticeSection;

const Bar = styled.div`
  width: 100%;
  height: 45px; /* 한 줄로 딱 맞는 높이 설정 */
  display: flex;
`;

const NoticeText = styled.div`
  width: 15%;
  height: 45px; /* 한 줄로 딱 맞는 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Jua;
  font-size: 16px;
  color: #fff;
`;

// 공지사항 Wrapper
const NoticeWrapper = styled.div`
  width: 35%;
  height: 45px; /* 한 줄로 딱 맞는 높이 설정 */
  overflow: hidden; /* 슬라이딩 효과를 위해 숨김 처리 */
  position: relative;
  background-color: #000; /* 배경 색을 검정색으로 설정 */
`;

// 공지사항 리스트 컨테이너 (슬라이드 효과 적용)
const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 1s ease-in-out; /* 슬라이딩 효과 */
`;

// 개별 공지사항 아이템
const NoticeItem = styled.div`
  height: 45px; /* 고정 높이로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.2rem + 1vw);  /* 글자 크기 조정 */
  color: #fff; /* 글자 색을 흰색으로 설정 */
  text-align: center;
  background-color: #000; /* 배경 색을 검정색으로 설정 */
  box-sizing: border-box;
  font-family: 'Jua', sans-serif; /* 글씨체를 Jua로 설정 */
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: calc(1.8vw);  /* 모바일 화면에서는 글자 크기를 상대적으로 키움 */
  }
`;
