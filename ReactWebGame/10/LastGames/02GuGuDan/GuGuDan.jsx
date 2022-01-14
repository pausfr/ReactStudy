import React, { useState } from "react";

function randGugu() {
  return Math.ceil(Math.random() * 9);
}

export default function GuGuDan() {
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
      <div>
        {first} X {second} =
      </div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="number" value={value} onChange={onChange} />
        <button type="submit">입력!</button>
      </form>
      <div>{result}</div>
      <br />
      <br />
    </>
  );
}
