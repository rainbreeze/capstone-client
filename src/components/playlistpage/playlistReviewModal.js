import React, { useState } from "react";
import axios from "axios";

const PlaylistReviewModal = ({
  musicId,
  imageUrl,
  genre,
  playlist_music_name,
  onClose,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const user_id = localStorage.getItem("userId");
    const user_name = localStorage.getItem("userName") || "익명";
    const user_profile = localStorage.getItem("profileImage");

    if (!user_id || !rating || !comment.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, {
        user_id,
        playlist_music_id: musicId,
        album_image_url: imageUrl,
        genre,
        rating,
        comment,
        playlist_music_name,
        user_name,
        user_profile,
      });

      alert("리뷰 제출 완료!");
      onClose();
    } catch (err) {
      alert("제출 실패");
      console.error(err);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>리뷰 작성</h2>

        <img src={imageUrl} alt="Album" style={styles.image} />

        <div style={styles.starBox}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#FFD700" : "#ccc",
                fontSize: "2rem",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          rows={12} // 🔥 크기 증가
          placeholder="리뷰를 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.buttonContainer}>
          <button onClick={handleSubmit} style={styles.button}>
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    height: "640px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "80%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  starBox: {
    marginBottom: "10px",
  },
  textarea: {
    width: "80%", // 가로폭 유지
    padding: "12px", // 약간 여유로운 패딩
    marginTop: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
    fontSize: "1rem",
    height: "160px", // 적당한 높이
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },

  button: {
    width: "100px", // 조금 작고 귀여운 버튼
    padding: "8px 0", // 위아래 간격 적절히
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem", // 살짝 작게
  },
};

export default PlaylistReviewModal;
