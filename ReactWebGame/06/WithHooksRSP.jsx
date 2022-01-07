import React, { useState, useRef, useEffect } from "react";

const scores = {
  rock: 1,
  scissors: 0,
  paper: -1,
};

export default function RSP() {
  const [result, setResult] = useState("");
  const [img, setImg] = useState("rock");
  const [score, setScore] = useState(0);
  const [fight, setFight] = useState(false); //커스텀 부분, 가위바위보 결과 나올 땐 버튼 비활성화 위함
  const interval = useRef();

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
    interval.current = setInterval(changeHand, 50);
    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [img]);

  const changeHand = () => {
    if (img === "rock") {
      setImg("scissors");
    } else if (img === "scissors") {
      setImg("paper");
    } else if (img === "paper") {
      setImg("rock");
    }
  };

  const onClickBtn = (choice) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[img];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setFight(true);
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setFight(true);
      setResult("졌습니다!");
      setScore((prevScore) => prevScore - 1);
    } else {
      setFight(true);
      setResult("이겼습니다!");
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setFight(false);
      interval.current = setInterval(changeHand, 50);
    }, 1000);
  };

  return (
    <>
      <img src={`./img/${img}.png`} className="image"></img>
      <div>
        <button
          id="rock"
          className="btn"
          onClick={() => onClickBtn("rock")}
          disabled={fight}
        >
          바위
        </button>
        <button
          id="scissors"
          className="btn"
          onClick={() => onClickBtn("scissors")}
          disabled={fight}
        >
          가위
        </button>
        <button
          id="paper"
          className="btn"
          onClick={() => onClickBtn("paper")}
          disabled={fight}
        >
          보
        </button>
      </div>
      <div>
        <p>결과: {result}</p>
        <p>점수: {score}</p>
      </div>
    </>
  );
}
