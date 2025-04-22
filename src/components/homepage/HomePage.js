import React from 'react';
import Header from './Header';
import Footer from '../common/Footer';
import Middle from './Middle';
import StartGameContainer from './StartGameContainer';
import ImageSlider from './ImageSlider';
import ContainerWrapper from './ContainerWrapper';
import NoticeSection from './NoticeSection'; // ← import 추가

const HomePage = () => (
    <div>
        <Header />
        <Middle>
            <ContainerWrapper>
                <StartGameContainer />
                <NoticeSection /> {/* ← 여기 삽입 */}
                <ImageSlider />
            </ContainerWrapper>
        </Middle>
        <Footer />
    </div>
);

export default HomePage;
