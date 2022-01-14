import React, { useState } from "react";

export default function LikeButton({ name }) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <button
        type="submit"
        onClick={() => {
          !liked ? setLiked(true) : setLiked(false);
        }}
      >
        {liked ? "Liked" : "Like"}
      </button>
    </>
  );
}
