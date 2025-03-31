import React from 'react';
import styled from 'styled-components';

const Footer = () => (
    <FooterWrapper>
        <CopyrightText>© 2025 Capstone Group 6 All rights reserved.</CopyrightText>
    </FooterWrapper>
);

export default Footer;

const FooterWrapper = styled.footer`
    background-color: #1d1d1d;
    color: #ffffff;
    font-family: Jua;
    text-align: center;
    padding: 3vh 0;
    position: relative;
    bottom: 0;
    width: 100%;
`;

const CopyrightText = styled.p`
    font-size: 1vw;
    margin: 0;
`;
