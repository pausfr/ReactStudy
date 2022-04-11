import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function LikeButton({ nickname }) {
  const [liked, setLiked] = useState(false);
  let cnt = useRef(0);
  const [tmp, setTmp] = useState(false);

  const onClickTmp = () => {
    console.log(cnt);
    if (cnt.current % 3 === 0) {
      setTmp(true);
      cnt.current++;
    } else {
      setTmp(false);
      cnt.current++;
    }
  };

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

        <button onClick={onClickTmp}>{tmp ? "True" : "False"}</button>
      </div>
    </>
  );
}
