// const React = require("react");
// const { Component } = React;

// class ResponseCheck extends Component {
//   state = {
//     state: "waiting",
//     message: "클릭해서 시작하세요.",
//     result: [],
//   };

//   timeout;
//   startTime;
//   endTime;

//   onClickScreen = () => {
//     const { state, message, result } = this.state;
//     if (state === "waiting") {
//       this.setState({
//         state: "ready",
//         message: "초록색이 되면 클릭하세요.",
//       });
//       this.timeout = setTimeout(() => {
//         this.setState({
//           state: "now",
//           message: "지금 클릭",
//         });
//         this.startTime = new Date();
//       }, Math.floor(Math.random() * 1000) + 1000); // 1초~2초 랜덤
//     } else if (state === "ready") {
//       // 성급하게 클릭한 경우
//       this.setState({
//         state: "waiting",
//         message: "너무 빨리 눌렀습니다. 초록색이 된 후에 클릭하세요!",
//       });
//       clearTimeout(this.timeout);
//     } else if (state === "now") {
//       // 반응속도 체크
//       this.endTime = new Date();
//       this.setState((prevState) => {
//         return {
//           state: "waiting",
//           message: "클릭해서 시작하세요.",
//           result: [...prevState.result, this.endTime - this.startTime],
//         };
//       });
//     }
//   };

//   renderAverage = () => {
//     const { result } = this.state;
//     return result.length === 0
//       ? "______"
//       : Math.round(result.reduce((a, c) => a + c) / result.length) / 1000;
//   };

//   renderSecond = () => {
//     const { result } = this.state;
//     return result.length === 0 ? "______" : result[result.length - 1] / 1000;
//   };

//   onReset = () => {
//     this.setState({
//       result: [],
//     });
//   };

//   render() {
//     return (
//       <>
//         <div
//           id="screen"
//           className={this.state.state}
//           onClick={this.onClickScreen}
//         >
//           {this.state.message}
//         </div>
//         <div>반응 시간: {this.renderSecond()}초</div>
//         <div>평균 시간: {this.renderAverage()}초</div>
//         <button onClick={this.onReset}>리셋</button>
//       </>
//     );
//   }
// }
// module.exports = ResponseCheck;

// // 보호연산자 사용 예)
// // {this.state.result.length !== 0 && (
// //     <div>
// //       평균 시간:{" "}
// //       {this.state.result.reduce((a, c) => a + c) /
// //         this.state.result.length}
// //       ms
// //     </div>
// //   )}
