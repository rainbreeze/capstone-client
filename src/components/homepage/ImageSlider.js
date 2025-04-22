import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const images = [
  {
    src: '/images/homepage/er1.png',
  },
  {
    src: '/images/homepage/er2.png',
  },
  {
    src: '/images/homepage/er3.png',
  },
  {
    src: '/images/homepage/homepage_nav05.png',
  },
  {
    src: '/images/homepage/er5.png',
  },
  {
    src: '/images/homepage/er4.png',
  },
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
        <SliderWrapper>
            <ImageTrack>
                <SlideImage
                    image={images[(currentImageIndex - 1 + images.length) % images.length].src}
                    faded
                />
                <SlideImage
                    image={images[currentImageIndex].src}
                    focused
                />
                <SlideImage
                    image={images[(currentImageIndex + 1) % images.length].src}
                    faded
                />
            </ImageTrack>
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
        </SliderWrapper>
    );
};

export default ImageSlider;

// Styled Components
const SliderWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

const ImageTrack = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;  /* 전체 너비 100% */
    gap: 2%;
`;

const SlideImage = styled.div`
    flex: ${(props) => (props.focused ? 3 : 1)};  /* focused일 때 3배 크기 */
    width: 40vw;  /* 이미지 크기를 뷰포트 기준으로 설정 */
    height: 25vw;  /* 동일하게 높이도 설정 */
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    transition: all 0.5s ease-in-out;
    opacity: ${(props) => (props.focused ? 1 : 0.5)};
    transform: ${(props) => (props.focused ? 'scale(1.05)' : 'scale(0.9)')};
    z-index: ${(props) => (props.focused ? 2 : 1)};
    position: relative;

    @media (max-width: 768px) {
        width: 60vw;  /* 작은 화면에서 비율을 더 키울 수 있음 */
        height: 60vw;  /* 작은 화면에서 높이도 비율 맞추기 */
    }
`;

const NavButtons = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    pointer-events: none;
    z-index: 3;  /* 버튼을 이미지 위로 올리기 위해 z-index 조정 */
`;

const NavButton = styled.button`
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }

    svg {
        font-size: 1.2rem;
    }
`;

const Pagination = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 3;  /* Pagination을 이미지 위로 올리기 위해 z-index 조정 */
`;

const Dot = styled.div`
    width: 12px;
    height: 12px;
    background-color: ${(props) =>
        props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.2);
        background-color: #fff;
    }
`;
