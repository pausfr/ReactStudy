import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers 실행!");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

export default function Lotto({ nickname }) {
  const lottoNumbers = useMemo(getWinNumbers, []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => timeouts.current.forEach((v) => clearTimeout(v));
  }, [timeouts.current]); // 의존성배열이 []이면 componentDidMount와 동일
  // 배열에 요소가 있으면 DidMount와 DidUpdate의 역할을 동시 수행

  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, []); // 함수 자체를 기억해두어서 onClickRedo가 새로 생성되지 않는다.

  return (
    <>
      <div className="gameGreeting">{nickname}님을 위한 행운의 번호</div>
      <div className="game">
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        <br />
        <br />
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </div>
    </>
  );
}
