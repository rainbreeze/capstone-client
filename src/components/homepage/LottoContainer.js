import React from "react";
import styled from "styled-components";

const LottoContainer = () => {
    return (
        <Container>
            <BadgeContainer>
                <Badge
                    frontImage="images/homepage/et2.png"
                    backImage="images/homepage/et1.png"
                />
            </BadgeContainer>
        </Container>
    );
};

export default LottoContainer;

// Styled Components
const Container = styled.div`
    width: 100%;
    height: 80vh;
    background-image: url('images/homepage/ed3.png');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BadgeContainer = styled.div`
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Badge = ({ frontImage, backImage }) => {
    return (
        <BadgeWrapper>
            <Front src={frontImage} alt="Front Badge" />
            <Back>
                <BackImage src={backImage} alt="Back Badge" />
                <Overlay>
                    <Message>
                        오늘의 모험에 도전하고,<br />
                        멋진 상품도 받아가세요!
                    </Message>
                    <ActionButton onClick={() => alert("응모 페이지로 이동!")}>
                        응모하러 가기
                    </ActionButton>
                </Overlay>
            </Back>
        </BadgeWrapper>
    );
};


const BadgeWrapper = styled.div`
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
    &:hover {
        transform: rotateY(180deg);
    }
`;

const Front = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
`;

const Back = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    position: relative;
`;

const BackImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
`;

const Overlay = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: 1vw;
`;

const Message = styled.p`
    font-size: 1.5vw;
    font-family: Jua;
    margin-bottom: 1vw;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
`;

const ActionButton = styled.button`
    padding: 0.6vw 1.5vw;
    font-size: 1.3vw;
    font-family: Jua;
    background-color: transparent;
    color: white;
    border: 0.15vw solid white;
    border-radius: 0.6vw;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 4px rgba(0,0,0,0.4);

    &:hover {
        background-color: gold;
        box-shadow: 0 0 10px gold, 0 0 20px gold;
    }
`;
