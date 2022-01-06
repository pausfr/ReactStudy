const React = require("react");
const { Component } = React;

const scores = {
  rock: 1,
  scissors: 0,
  paper: -1,
};

class RSP extends Component {
  state = {
    result: "",
    img: "rock",
    score: 0,
  };

  interval;

  componentDidMount() {
    // 비동기 요청 많이 함
    this.interval = setInterval(this.changeHand, 50);
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    // 비동기 요청 정리를 많이 함
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { img } = this.state;
    if (img === "rock") {
      this.setState({
        img: "scissors",
      });
    } else if (img === "scissors") {
      this.setState({
        img: "paper",
      });
    } else if (img === "paper") {
      this.setState({
        img: "rock",
      });
    }
  };

  onClickBtn = (choice) => {
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[this.state.img];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 50);
    }, 1000);
  };

  render() {
    const { result, img, score } = this.state;
    return (
      <>
        <img src={`./img/${img}.png`}></img>
        <div>
          <button
            id="rock"
            className="btn"
            onClick={() => this.onClickBtn("rock")}
          >
            바위
          </button>
          <button
            id="scissors"
            className="btn"
            onClick={() => this.onClickBtn("scissors")}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn"
            onClick={() => this.onClickBtn("paper")}
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
}
module.exports = RSP;
