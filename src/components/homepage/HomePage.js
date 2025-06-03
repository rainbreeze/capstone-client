import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Middle from './Middle';
import StartGameContainer from './StartGameContainer';
import ImageSlider from './ImageSlider';
import ContainerWrapper from './ContainerWrapper';
import InfoCardContainer from './InfoCardContainer';
import LiveRankingContainer from './LiveRankingContainer'

const HomePage = () => (
    <div>
        <Header />
        <Middle>
            <ContainerWrapper>
                <StartGameContainer />
                <InfoCardContainer></InfoCardContainer>
                <ImageSlider />
                <LiveRankingContainer></LiveRankingContainer>
            </ContainerWrapper>
        </Middle>
        <Footer />
    </div>
);

export default HomePage;
