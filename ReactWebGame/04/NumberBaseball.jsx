// const React = require("react");
// const { Component } = React;
// const Try = require("./Try.jsx");

// function getNumbers() {
//   const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const array = [];
//   for (let i = 0; i < 4; i += 1) {
//     const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
//     array.push(chosen);
//   }
//   return array;
// }

// class NumberBaseball extends Component {
//   state = {
//     result: "□□□□",
//     value: "",
//     answer: getNumbers(),
//     tries: [],
//   };

//   onSubmitForm = (e) => {
//     e.preventDefault();

//     const { result, value, answer, tries } = this.state;
//     if (this.state.value === this.state.answer.join("")) {
//       // 정답 맞췄을 때
//       this.setState((prevState) => {
//         return {
//           result: "홈런!",
//           tries: [...prevState.tries, { try: value, result: "홈런" }], // 전개연산자 활용
//         };
//       });
//       alert(`홈런!`);
//       alert(`게임을 다시 시작합니다!`);
//       this.setState({
//         value: "",
//         answer: getNumbers(),
//         tries: [],
//       });
//     } else {
//       // 틀렸을 때
//       const answerArray = value.split("").map((v) => parseInt(v));
//       let strike = 0;
//       let ball = 0;
//       if (tries.length >= 14) {
//         // 시도 회수가 15회 이상일 때
//         this.setState({
//           result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`,
//         });
//         alert(`게임을 다시 시작합니다!`);
//         this.setState({
//           value: "",
//           answer: getNumbers(),
//           tries: [],
//         });
//       } else {
//         // 시도 15회 이하일 때 볼과 스트라이크를 카운팅
//         for (let i = 0; i < 4; i += 1) {
//           if (answerArray[i] === answer[i]) {
//             strike += 1;
//           } else if (answer.includes(answerArray[i])) {
//             ball += 1;
//           }
//         }
//         this.setState({
//           value: "",
//           tries: [
//             ...tries,
//             {
//               try: value,
//               result: `${strike}스트라이크, ${ball}볼 입니다`,
//             },
//           ],
//         });
//       }
//     }
//   };

//   onChangeInput = (e) => {
//     this.setState({ value: e.target.value });
//   };

//   render() {
//     return (
//       <>
//         <h4>
//           설명: 4자리 숫자 중 포함되어 있으면 Ball, 숫자의 자리까지 맞추면
//           Strike
//         </h4>
//         <h4>기회는 15번!</h4>
//         <h1>{this.state.result}</h1>
//         <form onSubmit={this.onSubmitForm}>
//           <input
//             maxLength={4}
//             value={this.state.value}
//             onChange={this.onChangeInput}
//           />
//         </form>
//         <div>시도 : {this.state.tries.length}</div>
//         <ul>
//           {this.state.tries.map((v, i) => (
//             <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
//           ))}
//         </ul>
//       </>
//     );
//   }
// }

// module.exports = NumberBaseball;
