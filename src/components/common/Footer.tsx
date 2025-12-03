import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => (
    <FooterWrapper>
        <CopyrightText>© 2025 Beatopia All rights reserved.</CopyrightText>
    </FooterWrapper>
);

export default Footer;

// styled-components를 사용한 스타일링
const FooterWrapper = styled.footer`
  color: #ffffff;
  text-align: center;
  padding: 3vh 0;
  position: relative;
  bottom: 0;
  width: 100%;

  /* ▼▼▼ 여백 추가 (예: 50px 또는 5vh 등 원하는 만큼) ▼▼▼ */
  margin-top: 50px;
`;

const CopyrightText = styled.p`
  font-size: 1vw;
  margin: 0;
`;