import React from 'react';
import Header from '../common/Header';
import Middle from './Middle';
import StartGameContainer from './StartGameContainer';
import ContainerWrapper from './ContainerWrapper';
import InfoCardContainer from './InfoCardContainer';

const HomePage = () => (
    <div>
        <Header />
        <Middle>
            <ContainerWrapper>
                <StartGameContainer />
                <InfoCardContainer />
                {/* <ImageSlider /> */}
                {/* <LiveRankingContainer /> */}
            </ContainerWrapper>
        </Middle>
    </div>
);

export default HomePage;