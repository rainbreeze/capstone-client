import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Middle from './Middle';
import StartGameContainer from './StartGameContainer';
import ImageSlider from './ImageSlider';
import ContainerWrapper from './ContainerWrapper';
import NoticeSection from './NoticeSection'; // ← import 추가
import RankingContainer from './RankingContainer';
import LottoContainer from './LottoContainer';
import InfoCardContainer from './InfoCardContainer';

const HomePage = () => (
    <div>
        <Header />
        <Middle>
            <ContainerWrapper>
                <StartGameContainer />
                <InfoCardContainer></InfoCardContainer>
                <NoticeSection /> {/* ← 여기 삽입 */}
                <ImageSlider />
                <RankingContainer></RankingContainer>
                <LottoContainer></LottoContainer>
            </ContainerWrapper>
        </Middle>
        <Footer />
    </div>
);

export default HomePage;
