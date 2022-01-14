import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function LikeButton({ nickname }) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="gameGreeting">{nickname}님을 위한 좋아요 버튼</div>
      <div className="game">
        <button
          type="submit"
          onClick={() => {
            !liked ? setLiked(true) : setLiked(false);
          }}
        >
          {liked ? "Liked" : "Like"}
        </button>
      </div>
    </>
  );
}
