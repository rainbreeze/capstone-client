import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/login');
    };

    return (
        <div className="landing-container">
            {/* 배경 애니메이션 요소 (CSS에서 제어) */}
            <div className="background-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="landing-content">
                <h1 className="landing-title">BEATOPIA</h1>
                <p className="landing-description">
                    게임과 음악이 하나 되는 공간<br />
                    당신의 취향을 분석해 완벽한 음악을 찾아드립니다
                </p>

                <button className="start-button" onClick={handleStart}>
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default LandingPage;