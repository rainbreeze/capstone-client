import React, { useState, useEffect, useMemo } from 'react';

const PlaylistDetailModal = ({ playlist, onClose, onDelete, onReview, onTrackDelete }) => {
    const musics = useMemo(() => playlist?.musics || [], [playlist?.musics]);
    const [selectedTrack, setSelectedTrack] = useState(musics.length > 0 ? musics[0] : null);

    useEffect(() => {
        if (musics.length > 0) {
            setSelectedTrack(musics[0]);
        } else {
            setSelectedTrack(null);
        }
    }, [musics]);

    if (!playlist) return null;

    const handleDeletePlaylist = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete(playlist.playlistId);
            onClose();
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={styles.closeButton}>✕</button>

                <div style={styles.container}>
                    {/* 좌측: 가변 곡수 2열 그리드 이미지 버튼 */}
                    <div style={styles.leftPanel}>
                        {musics.length > 0 ? (
                            musics.map(music => (
                                <button
                                    key={music.playlistMusicId}
                                    style={{
                                        ...styles.imageButton,
                                        border: selectedTrack && selectedTrack.musicId === music.musicId ? '3px solid #1976d2' : '1px solid #ccc',
                                        backgroundImage: `url(${music.albumImageUrl})`,
                                    }}
                                    onClick={() => setSelectedTrack(music)}
                                    aria-label={music.trackName}
                                />
                            ))
                        ) : (
                            <p style={styles.emptyText}>곡이 없습니다.</p>
                        )}
                    </div>

                    {/* 우측: 메인 이미지 및 텍스트 */}
                    <div style={styles.rightPanel}>
                        {selectedTrack ? (
                            <>
                                <img src={selectedTrack.albumImageUrl} alt={selectedTrack.trackName} style={styles.albumImageLarge} />

                                <div style={styles.infoBox}>
                                    <div style={styles.labelsColumn}>
                                        <span>곡 이름:</span>
                                        <span>아티스트:</span>
                                        <span>장르:</span>
                                        <span>바로가기링크:</span>
                                    </div>
                                    <div style={styles.valuesColumn}>
                                        <span>{selectedTrack.trackName}</span>
                                        <span>{selectedTrack.artistName || '아티스트 정보 없음'}</span>
                                        <span>{selectedTrack.genre || '장르 정보 없음'}</span>
                                        {selectedTrack.spotifyUrl ? (
                                            <a
                                                href={selectedTrack.spotifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={styles.spotifyLink}
                                            >
                                                스포티파이에서 듣기
                                            </a>
                                        ) : (
                                            <span style={styles.noLink}>Spotify 링크가 없습니다.</span>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.buttonGroup}>
                                    <button
                                        onClick={() => onReview(selectedTrack.musicId)}
                                        style={styles.simpleButton}
                                    >
                                        리뷰 작성
                                    </button>
                                    <button
                                        onClick={handleDeletePlaylist}
                                        style={styles.simpleButton}
                                    >
                                        플레이리스트 삭제
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p style={{ marginBottom: '20px' }}>선택된 곡이 없습니다.</p>
                                <button
                                    onClick={handleDeletePlaylist}
                                    style={styles.simpleButton}
                                >
                                    플레이리스트 삭제
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        width: '60%',
        maxHeight: '70vh',
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '1.2rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    container: {
        display: 'flex',
        gap: '20px',
        flexGrow: 1,
    },
    leftPanel: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2열 고정
        gridAutoRows: '1fr',
        gridGap: '10px',
        width: '50%',
        maxHeight: '500px',      // 필요시 스크롤 가능 높이 제한
        overflowY: 'auto',
    },
    imageButton: {
        width: '100%',
        paddingTop: '100%',       // 정사각형 유지
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        outline: 'none',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    rightPanel: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    albumImageLarge: {
        width: '80%',
        borderRadius: '12px',
    },
    infoBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
        width: '100%',
        maxWidth: '350px',
    },
    labelsColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',      // 수직 중앙 정렬
        alignItems: 'center',          // 수평 중앙 정렬
        fontSize: '0.8rem',
        color: '#666',
        gap: '12px',
        width: '50%',
        fontWeight: '600',
        lineHeight: '1.5',
    },
    valuesColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',      // 수직 중앙 정렬
        alignItems: 'center',          // 수평 중앙 정렬
        fontSize: '0.8rem',
        color: '#666',
        gap: '12px',
        width: '50%',
        lineHeight: '1.5',
    },
    spotifyLink: {
        color: '#1DB954',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        marginLeft: '4px',
    },
    noLink: {
        color: '#999',
        fontSize: '0.8rem',
        fontStyle: 'italic',
    },
    buttonGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
    },
    simpleButton: {
        flex: 1,
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #000',
        padding: '10px 0',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    emptyText: {
        color: '#999',
        fontStyle: 'italic',
    },
};

export default PlaylistDetailModal;
