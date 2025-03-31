import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Middle from './Middle';
import StartGameContainer from './StartGameContainer';
import ImageSlider from './ImageSlider';
import ContainerWrapper from './ContainerWrapper';

const HomePage = () => (
    <div>
        <Header />
        <Middle>
            <ContainerWrapper>
                <StartGameContainer />
                <ImageSlider />
            </ContainerWrapper>
        </Middle>
        <Footer />
    </div>
);

export default HomePage;
