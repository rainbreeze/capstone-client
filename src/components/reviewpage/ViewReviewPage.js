import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import styled from 'styled-components';
import ReviewCommentModal from './ReviewCommentModal'; // import 위치 적절히 조정


function ViewReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [likedReviews, setLikedReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  
const getProfileImage = (path) => {
  if (!path) return '/images/header/profile.png';
  const decodedPath = decodeURIComponent(path); // <- URL 디코딩
  const isFullUrl = decodedPath.startsWith('http') || decodedPath.startsWith('/');
  const prefix = decodedPath.startsWith('/') ? '' : '/uploads/';
  return isFullUrl ? decodedPath : `${process.env.REACT_APP_API_URL}${prefix}${decodedPath}`;
};

  const handleCommentClick = (reviewId) => {
    setSelectedReviewId(reviewId);  // 모달 열기
  };
  const handleCloseModal = () => {
    setSelectedReviewId(null);
  };
  const handleShare = (reviewId) => {
    const reviewUrl = `${window.location.origin}/review/${reviewId}`;
    navigator.clipboard.writeText(reviewUrl)
      .then(() => alert('리뷰 URL이 복사되었습니다!'))
      .catch(() => alert('복사에 실패했습니다.'));
  };

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('profileImage') || '';
    console.log('프로필 이미지:', storedProfileImage);
  }, []);

  const handleLike = async (reviewId) => {
    const alreadyLiked = likedReviews.includes(reviewId);
    const endpoint = alreadyLiked ? 'unLike' : 'like';

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}/${endpoint}`);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`);
      setReviews(response.data);
      setLikedReviews((prev) =>
        alreadyLiked ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]
      );
    } catch (err) {
      console.error('좋아요 처리 실패:', err);
      setError('좋아요 처리 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`);
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          throw new Error("리뷰 데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error('전체 리뷰 조회 실패:', err);
        setError('리뷰를 불러오는 데 실패했습니다.');
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <>
      <Header />
      <ImageContainer>
        <HeaderImage
          src="images/review/top_banner.png"
          alt="헤더 배경 이미지"
        />
        <OverlayText>
          음악 위에 남겨진 마음들, <br />
          천천히 읽어보세요.
        </OverlayText>
        <ListenHereText>감상 가능한 곳</ListenHereText>
        <LogoContainer>
          <Logo src="images/playlist/logo1.png" alt="YouTube" />
          <Logo src="images/playlist/logo2.png" alt="Spotify" />
        </LogoContainer>
      </ImageContainer>
      <ButtonSection>
        <RealTimeButton onClick={() => alert('실시간 리뷰 클릭!')}>
          최신
        </RealTimeButton>
      </ButtonSection>
      <Container>
        {reviews.length === 0 ? (
          <Text>리뷰가 아직 없습니다.</Text>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.review_id}>
              <LeftSection>
                <ProfileBoxVertical>
                  <ProfileImage
                    src={getProfileImage(review.user_profile)}
                    alt="profile"
                  />
                  <ProfileName>{review.user_name}</ProfileName>
                  <CreatedAt>{review.created_at.slice(0, 16).replace('T', ' ')}</CreatedAt>
                </ProfileBoxVertical>
                <AlbumImage
                  src={review.album_image_url}
                  alt="Album"
                />
                <SongName>{review.playlist_music_name}</SongName>
              </LeftSection>

              <RightSection>
                <RatingBox>
                  <Rating>{'★'.repeat(review.rating)}</Rating>
                </RatingBox>
                <CommentBox>{review.comment}</CommentBox>
                <Divider />
                <BottomSection>
                  <BottomLeftSection>
                    <LikeButton
                      active={likedReviews.includes(review.review_id)}
                      onClick={() => handleLike(review.review_id)}
                    >
                      <span className="material-icons-outlined">thumb_up</span>
                    </LikeButton>
                    <LikeButton onClick={() => handleCommentClick(review.review_id)}>
                      <span className="material-icons-outlined">chat</span>
                    </LikeButton>
                    <LikeButton onClick={() => handleShare(review.review_id)} title="공유하기">
                      <span className="material-icons-outlined">share</span>
                    </LikeButton>
                  </BottomLeftSection>
                  <BottomLeftSection>
                    <SmallGrayText>좋아요 {review.like_count}</SmallGrayText>
                    <SmallGrayText>댓글 {review.comment_count}</SmallGrayText>
                  </BottomLeftSection>
                </BottomSection>
              </RightSection>
            </ReviewCard>
          ))
        )}

        {error && <ErrorText>{error}</ErrorText>}
      </Container>
      {selectedReviewId && (
        <ReviewCommentModal reviewId={selectedReviewId} onClose={handleCloseModal} />
      )}
      <Footer />
    </>
  );
}

// Styled Components

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 48vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 8vh;
  left: 12vw;
  color: white;
  font-size: 2vw;
  font-weight: 600;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.7);
  line-height: 1.4;
  max-width: 60vw;
  font-family: 'Noto Sans KR';

  @media (max-width: 768px) {
    font-size: 4vw;
    left: 5vw;
    max-width: 90vw;
  }
`;

const ListenHereText = styled.div`
  position: absolute;
  bottom: 95px;
  right: 30px;
  color: rgba(110, 110, 110, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  user-select: none;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    right: 10px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 30px;
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    gap: 10px;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  cursor: pointer;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.5));

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ButtonSection = styled.div`
  padding: 2vh 10vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const RealTimeButton = styled.button`
  padding: 10px 20px;
  font-size: 1vw;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  background-color: black;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 12px 25px;
  }
`;

const Container = styled.div`
  padding: 0 10vw;
  text-align: center;
  min-height: 80vh;
  font-family: 'Noto Sans KR';

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 0 5vw;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #333;
  font-family: 'Noto Sans KR';
`;

const ReviewCard = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  justify-content: space-between;
  width: calc(50% - 10px);
  box-sizing: border-box;
  max-height: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 300px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;

`;

const ProfileBoxVertical = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProfileName = styled.p`
  font-size: 1rem;
  font-family: 'Noto Sans KR';
  color: #333;
  font-weight: 600;
  white-space: nowrap;
`;

const AlbumImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;


  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const SongName = styled.p`
  font-size: 0.9rem;
  color: #555;
  font-style: italic;
  font-family: 'Noto Sans KR';
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1vw;
  }
`;

const CreatedAt = styled.p`
  font-size: 0.6rem;
  color: #555;
  font-style: italic;
  font-family: 'Noto Sans KR';
  text-align: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 1vw;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 20px;

    @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
`;

const Rating = styled.p`
  font-size: 1.5rem;
  color: #f39c12;
  font-family: 'Jua';
`;

const CommentBox = styled.div`
  flex: 1;
  margin-top: 1.5vh;
  text-align: left;
  font-family: 'Noto Sans KR';
  font-size: 1.1rem;
  font-weight: 450;
  color: #333;
  margin-bottom: 20px;
  min-height: 60px;  /* 추가 */
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 0 auto 2px auto;
  opacity: 0.5;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  width: 100%;
`;

const BottomLeftSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  font-family: 'Noto Sans KR';
`;

const LikeButton = styled.button`
  background-color: ${(props) => (props.active ? '#f1c40f' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#ddd')};
  font-family: 'Noto Sans KR';
  font-size: 1.2rem;
  padding: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2vw;
  width: 2vw;
  border: none;
  outline: none;
`;

const SmallGrayText = styled.p`
  color: gray;
  font-size: 0.6vw;
  font-family: 'Noto Sans KR';
  cursor: default;
  user-select: none;
  margin-right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    font-size: 1vw;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'Noto Sans KR';
`;

export default ViewReviewPage;
