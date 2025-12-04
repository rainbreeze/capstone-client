import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const KakaoCallbackHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');
        const userName = params.get('userName');
        const profileImage = params.get('profileImage');

        if (token && userId) {
            try {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                localStorage.setItem('userName', decodeURIComponent(userName || ''));
                localStorage.setItem('profileImage', profileImage || '');
                
                window.dispatchEvent(new Event('auth-change'));

                console.log("Kakao Login Success: Redirecting to /home.");

                navigate('/home', { replace: true });

            } catch (error) {
                console.error("Error saving data to localStorage:", error);
                navigate('/login?error=LocalStorageFailed', { replace: true });
            }
        } else {
            console.error("Kakao Login Failed: Missing token or userId in URL parameters.");
            navigate('/login?error=KakaoLoginFailed', { replace: true });
        }
        
    }, [location.search, navigate]);

};

export default KakaoCallbackHandler;