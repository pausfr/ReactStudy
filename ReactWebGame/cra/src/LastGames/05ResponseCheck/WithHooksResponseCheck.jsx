import React, { useState, useRef } from "react";

export default function ResponseCheck({ nickname }) {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = Date.now();
      }, Math.floor(Math.random() * 1000) + 1000); // 1초~2초 랜덤
    } else if (state === "ready") {
      // 성급하게 클릭한 경우
      setState("waiting");
      setMessage("너무 빨리 눌렀습니다. 초록색이 된 후에 클릭하세요!");

      clearTimeout(timeout.current);
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = Date.now(); // 강의듣기 전 비동기적 실행으로 인해 endTime은 함수 내 변수로, startTime은 스테이트로 선언했는데 다른 방법은? ref를 사용하는 것.
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult((prevState) => [
        ...prevState,
        endTime.current - startTime.current,
      ]);
    }
  };

  const renderAverage = () => {
    return result.length === 0
      ? "______"
      : Math.round(result.reduce((a, c) => a + c) / result.length) / 1000;
  };

  const renderSecond = () => {
    return result.length === 0 ? "______" : result[result.length - 1] / 1000;
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div className="gameGreeting">
        {nickname}님, 육상경기에서 0.1초 이하의 반응시간은 실격입니다.
      </div>
      <div className="game">
        <div id="screen" className={state} onClick={onClickScreen}>
          {message}
        </div>
        <div>반응 시간: {renderSecond()}초</div>
        <div>평균 시간: {renderAverage()}초</div>
        <button onClick={onReset}>리셋</button>
      </div>
    </>
  );
}

// 보호연산자 사용 예)
// {this.state.result.length !== 0 && (
//     <div>
//       평균 시간:{" "}
//       {this.state.result.reduce((a, c) => a + c) /
//         this.state.result.length}
//       ms
//     </div>
//   )}
