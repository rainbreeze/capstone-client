import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';  // GamePage와 동일한 Header 사용
import Footer from '../common/Footer';  // GamePage와 동일한 Footer 사용

const TestResultPage = () => {
    const location = useLocation();
    const { musicRecommendation } = location.state || {};  // resultPage로 전달된 음악 추천 데이터

    return (
        <div>
            <Header />  {/* GamePage에서 사용한 Header 컴포넌트 */}
            <div style={styles.container}>
                <h1 style={styles.h1}>음악 추천 결과</h1>
                {musicRecommendation && musicRecommendation.length > 0 ? (
                    <div>
                        {musicRecommendation.map((track, index) => {
                            console.log('Track:', track);
                            return (
                                <div key={index} style={styles.trackContainer}>
                                    {/* 앨범 이미지 표시 */}
                                    {track.album.images && track.album.images.length > 0 && (
                                        <img
                                            src={track.album.images[0].url}
                                            alt={`${track.name} album cover`}
                                            style={styles.albumImage}
                                        />
                                    )}
                                    <p style={styles.trackText}>장르: {track.genre}</p>
                                    <p style={styles.trackText}>
                                        아티스트: {track.artists.map(artist => artist.name).join(', ')}
                                    </p>
                                    <p style={styles.trackText}>곡 제목: {track.name}</p>
                                    <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" style={styles.spotifyLink}>
                                        Spotify에서 듣기
                                    </a>
                                </div>);
                        })}
                    </div>
                ) : (
                    <p style={styles.trackText}>추천된 음악이 없습니다.</p>
                )}
            </div>
            <Footer />  {/* GamePage에서 사용한 Footer 컴포넌트 */}
        </div>
    );
};

const styles = {
    h1: {
        fontSize: '4vw',
        fontFamily: 'Jua',
        marginBottom: '20px',
    },
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    trackContainer: {
        marginBottom: '20px',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    albumImage: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    trackText: {
        fontSize: '1.2vw',
        fontFamily: 'Jua',
        marginBottom: '10px',
    },
    spotifyLink: {
        fontSize: '1.2vw',
        color: '#1ED760',
        textDecoration: 'none',
        fontFamily: 'Jua',
    },
};

export default TestResultPage;
