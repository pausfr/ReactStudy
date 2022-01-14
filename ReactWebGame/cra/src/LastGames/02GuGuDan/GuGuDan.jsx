import React, { useState } from "react";

function randGugu() {
  return Math.ceil(Math.random() * 9);
}

export default function GuGuDan({ nickname }) {
  let [first, setFirst] = React.useState(randGugu());
  let [second, setSecond] = React.useState(randGugu());
  let [value, setValue] = React.useState("");
  let [result, setResult] = React.useState("");

  const inputRef = React.useRef();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(`정답`);
      setFirst(randGugu());
      setSecond(randGugu());
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className="gameGreeting">{nickname}님 구구단 잘하세요?</div>
      <div className="game">
        <h1 align="center">
          {first} X {second} =
        </h1>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="number"
            value={value}
            onChange={onChange}
          />
          <button type="submit">확인</button>
        </form>
        <div>{result}</div>
        <br />
        <br />
      </div>
    </>
  );
}
