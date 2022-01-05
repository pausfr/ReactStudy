// const React = require("react");
// const { Component } = React;

// function getNumbers() {
//   let num = "";
//   let cnt = 0;
//   while (cnt < 4) {
//     let newNum = String(Math.floor(Math.random() * 10));
//     if (!num.includes(newNum)) {
//       num += newNum;
//       cnt += 1;
//     }
//   }
//   return num;
// }

// class NumberBaseball extends Component {
//   state = {
//     result: "",
//     value: "",
//     answer: getNumbers(),
//     tries: [],
//   };

//   onSubmitForm = (e) => {
//     e.preventDefault();

//     if (this.state.value == this.state.answer) {
//       this.setState({
//         result: "정답",
//         value: "",
//         answer: getNumbers(),
//         tries: [],
//       });
//     } else {
//       let ballCnt = 0;
//       let strikeCnt = 0;

//       let answerCheck = [...this.state.answer];
//       for (let i = 0; i < this.state.value.length; i++) {
//         if (this.state.value[i] === answerCheck[i]) {
//           strikeCnt += 1;
//           answerCheck[i] = "x";
//         } else {
//           for (let j = 0; j < this.state.value.length; j++) {
//             if (j == i) {
//               continue;
//             }
//             if (this.state.value[i] === answerCheck[j]) {
//               ballCnt += 1;
//             }
//           }
//         }
//       }

//       this.setState((prevState) => {
//         return {
//           result: `${ballCnt}볼 ${strikeCnt}스트라이크`,
//           value: "",
//           tries: [
//             ...prevState.tries,
//             {
//               value: this.state.value,
//               result: `${ballCnt}볼 ${strikeCnt}스트라이크`,
//             },
//           ],
//         };
//       });
//     }
//     this.prevResult = this.state.result;
//   };

//   onChangeInput = (e) => {
//     this.setState({ value: e.target.value });
//   };

//   render() {
//     return (
//       <>
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
//           {this.state.tries.map((v) => (
//             <li key={v + `x`}>{`${v.value} / ${v.result}`}</li>
//           ))}
//         </ul>
//       </>
//     );
//   }
// }

// module.exports = NumberBaseball;
