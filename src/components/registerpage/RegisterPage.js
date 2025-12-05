import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from '../common/Header';

const RegisterPage = () => {
    const [step, setStep] = useState(1);

    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const isValid = (value) => value.trim() !== '';
    const isValidEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordMatch = password === confirmPassword;

    const isStepValid = () => {
        switch (step) {
            case 1:
                return isValid(userName) && isValid(userId);
            case 2:
                return isValidEmail(email);
            case 3:
                return isValid(password) && isPasswordMatch;
            default:
                return false;
        }
    };

    const handleNext = (e) => {
        // 버튼 클릭 시 form submit이 발생하지 않도록 막음
        if (e) {
            e.preventDefault();
        }

        if (!isStepValid()) {
            alert('입력을 완료해주세요.');
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault(); // 1. 폼 제출 기본 동작 막기 (가장 먼저)

        // 2. [중요] 마지막 단계(3단계)가 아니라면 다음 단계로 넘기고 함수를 여기서 '끝내야' 합니다.
        if (step < 3) {
            handleNext();
            return; // 여기서 함수가 종료되어야 아래 유효성 검사를 실행하지 않습니다.
        }

        // 3. 마지막 단계(3단계) 유효성 검사
        // 2단계에서는 password가 비어있으므로 이 코드가 실행되면 무조건 에러가 납니다.
        if (!userName || !userId || !email || !password || !confirmPassword) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (!isPasswordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        const registerData = { userId, email, password, userName };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, registerData);
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert('회원가입 실패: 입력 정보를 확인해주세요.');
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <StepContent>
                        <InputGroup>
                            <Label>이 름</Label>
                            <Input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="이름을 입력하세요"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>아이디</Label>
                            <Input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="아이디를 입력하세요"
                            />
                        </InputGroup>
                    </StepContent>
                );
            case 2:
                return (
                    <StepContent>
                        <InputGroup>
                            <Label>이메일</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                            />
                        </InputGroup>
                    </StepContent>
                );
            case 3:
                return (
                    <StepContent>
                        <InputGroup>
                            <Label>비밀번호</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>재입력</Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="비밀번호 확인"
                            />
                        </InputGroup>
                    </StepContent>
                );
            default:
                return null;
        }
    };

    return (
        <PageWrapper>
            <Header />

            <MainContainer>
                {/* 배경 애니메이션 요소 */}
                <BackgroundShapes>
                    <Shape />
                    <Shape />
                    <Shape />
                </BackgroundShapes>

                <GlassContainer>
                    <Title>JOIN US</Title>

                    {/* 프로그레스 바 (숫자 제거됨) */}
                    <StepIndicatorWrapper>
                        {[1, 2, 3].map((s, index) => (
                            <React.Fragment key={s}>
                                {/* 숫자 {s}를 지웠습니다 */}
                                <StepCircle active={step >= s} />
                                {index < 2 && (
                                    <StepLine active={step > s} />
                                )}
                            </React.Fragment>
                        ))}
                    </StepIndicatorWrapper>

                    <Form onSubmit={handleRegisterSubmit}>
                        {renderStepContent()}

                        <ButtonDataWrapper>
                            {step > 1 && (
                                <ActionButton type="button" onClick={handleBack} secondary>
                                    이전
                                </ActionButton>
                            )}
                            {step < 3 ? (
                                <ActionButton type="button" onClick={handleNext}>
                                    다음
                                </ActionButton>
                            ) : (
                                <ActionButton type="submit">
                                    완료
                                </ActionButton>
                            )}
                        </ButtonDataWrapper>
                    </Form>
                </GlassContainer>
            </MainContainer>
        </PageWrapper>
    );
};

export default RegisterPage;

// ========== Animations ==========

const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
  100% { transform: translate(0, 0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ========== Styled Components ==========

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #191414; /* Spotify Black */
  overflow: hidden;
  font-family: 'Noto Sans KR', sans-serif;
`;

const MainContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8vh 20px;
  background: radial-gradient(circle at 50% -20%, #2a2a2a, #191414);
  overflow: hidden;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, rgba(0,0,0,0) 70%);
  animation: ${float} 10s infinite ease-in-out;
  opacity: 0.6;

  &:nth-child(1) { width: 600px; height: 600px; top: -100px; left: -100px; animation-duration: 12s; }
  &:nth-child(2) { width: 400px; height: 400px; bottom: 50px; right: -50px; animation-duration: 15s; animation-delay: 1s; }
  &:nth-child(3) { width: 300px; height: 300px; top: 30%; right: 20%; animation-duration: 14s; animation-delay: 2s; }
`;

const GlassContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  padding: 50px 40px;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideUp} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 30px;
  letter-spacing: -1px;
`;

const StepIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  gap: 10px; /* 간격 살짝 조정 */
`;

const StepCircle = styled.div`
  /* 크기를 줄여서 '점(Dot)' 형태로 변경 */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;

  /* 숫자가 없으므로 배경색으로 활성화 상태 구분 */
  background-color: ${props => props.active ? '#1DB954' : 'rgba(255,255,255,0.2)'};

  /* 활성화 시 빛나는 효과 추가 */
  box-shadow: ${props => props.active ? '0 0 10px rgba(29, 185, 84, 0.8)' : 'none'};
`;

const StepLine = styled.div`
  width: 40px;
  height: 2px;
  /* 선 색상도 배경과 어우러지게 조정 */
  background-color: ${props => props.active ? '#1DB954' : 'rgba(255,255,255,0.1)'};
  transition: background-color 0.3s ease;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StepContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 8px;
  font-weight: 500;
  margin-left: 5px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    border-color: #1DB954;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
  }
`;

const ButtonDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 40px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px 0;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: ${props => props.secondary ? 'rgba(255,255,255,0.1)' : '#1DB954'};
  color: ${props => props.secondary ? '#fff' : '#000'};

  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.secondary ? 'rgba(255,255,255,0.2)' : '#1ed760'};
    box-shadow: ${props => props.secondary ? 'none' : '0 4px 15px rgba(29, 185, 84, 0.4)'};
  }
`;