import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const images = [
    '/images/homepage/homepage_nav02.png',
    '/images/homepage/homepage_nav03.png',
    '/images/homepage/homepage_nav04.png',
    '/images/homepage/homepage_nav05.png'
];

const ImageSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <ImageContainer2 backgroundImage={images[currentImageIndex]}>
            <NavButtons>
                <NavButton onClick={goToPreviousImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </NavButton>
                <NavButton onClick={goToNextImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </NavButton>
            </NavButtons>

            <Pagination>
                {images.map((_, index) => (
                    <Dot
                        key={index}
                        isActive={index === currentImageIndex}
                        onClick={() => goToImage(index)}
                    />
                ))}
            </Pagination>
        </ImageContainer2>
    );
};

export default ImageSlider;

const ImageContainer2 = styled.div`
    position: relative;
    width: 100%;
    height: 30vw;
    background-image: url(${(props) => props.backgroundImage});
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        height: 25vw;
    }
`;

const NavButtons = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 5%;
    align-items: center;

    @media (max-width: 768px) {
        padding: 0 5%;
    }
`;

const NavButton = styled.button`
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1vw; /* 폰트 크기를 뷰포트 크기로 설정 */
    border: none;
    width: 3vw; /* 버튼 너비를 뷰포트 너비 기준으로 설정 */
    height: 3vw; /* 버튼 높이를 뷰포트 너비 기준으로 설정 */
    border-radius: 50%; /* 동그라미 모양 */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .fa-chevron-left, .fa-chevron-right {
        font-size: 2vw; /* 아이콘 크기 조정 */
    }
`;

const Pagination = styled.div`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2%;

    @media (max-width: 768px) {
        gap: 5%;
    }
`;

const Dot = styled.div`
    width: 1.5vw;
    height: 1vw;
    background-color: ${(props) => (props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)')};
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
    }
`;
