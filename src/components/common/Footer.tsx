import React from 'react';
import styled from 'styled-components';

// Footer 컴포넌트에는 props가 없으므로 특별한 타입을 정의할 필요는 없습니다.
const Footer: React.FC = () => (
    <FooterWrapper>
        <CopyrightText>© 2025 Capstone Group 8 All rights reserved.</CopyrightText>
    </FooterWrapper>
);

export default Footer;

// styled-components를 사용한 스타일링
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
