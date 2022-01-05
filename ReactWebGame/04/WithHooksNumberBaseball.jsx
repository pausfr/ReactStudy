import React, { useState } from "react";
import Try from "./WithHooksTry";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("□□□□");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  // const [isFunc, setIsFunc] = useState(true);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (value === answer.join("")) {
      // 정답 맞췄을 때
      setResult("홈런!");
      setTries((prevState) => [...prevState, { try: value, result: "홈런" }]);

      alert(`홈런!`);
      alert(`게임을 다시 시작합니다!`);

      setValue("");
      setAnswer(getNumbers());
      setTries([]);
    } else {
      // 틀렸을 때
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 14) {
        // 시도 회수가 15회 이상일 때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`);
        alert(`게임을 다시 시작합니다!`);

        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        // 시도 15회 이하일 때 볼과 스트라이크를 카운팅
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setValue("");
        setTries((t) => [
          ...t,
          {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          },
        ]);
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h4>
        설명: 4자리 숫자 중 포함되어 있으면 Ball, 숫자의 자리까지 맞추면 Strike
      </h4>
      <h4>기회는 15번!</h4>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;

shouldComponentUpdate(nextProps, nextState, nextContext){
  if (this.state.counter !== nextState.counter){
    return true;
  }
  return false;
}