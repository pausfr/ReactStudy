// const React = require("react");
// const { Component } = React;

// class WordRelay extends Component {
//   state = {
//     word: "비비빅",
//     value: "",
//     result: "",
//   };

//   onSubmitForm = (e) => {
//     e.preventDefault();
//     if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//       this.setState({
//         result: "딩동댕",
//         word: this.state.value,
//         value: "",
//       });
//       this.input.focus();
//     } else {
//       this.setState({
//         result: "땡",
//         value: "",
//       });
//     }
//   };

//   onChangeInput = (e) => {
//     this.setState({ value: e.target.value });
//   };

//   input;

//   onRefInput = (c) => {
//     this.input = c;
//   };

//   render() {
//     return (
//       <>
//         <div>{this.state.word}</div>
//         <form onSubmit={this.onSubmitForm}>
//           <input
//             ref={this.onRefInput}
//             value={this.state.value}
//             onChange={this.onChangeInput}
//           />
//           <button>입력!</button>
//         </form>
//         <div>{this.state.result}</div>
//       </>
//     );
//   }
// }

// module.exports = WordRelay;

import React, { useState, useRef } from "react";

export default function WordRelay({ nickname }) {
  const [word, setWord] = useState("바밤바");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="gameGreeting">{nickname}님을 위한 끝말잇기 연습</div>
      <div className="game">
        <h1 align="center">{word}</h1>
        <form onSubmit={onSubmitForm}>
          <input
            id="wordInput"
            className="클래스입니다"
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            placeholder="글자를 입력하세요"
          />
          <button>입력!</button>
        </form>
        <h2 align="center">{result}</h2>
      </div>
    </>
  );
}
