import React, { Component, useState, useEffect } from "react";
import LikeButton from "./LastGames/01LikeButton/LikeButton";
import GuGuDan from "./LastGames/02GuGuDan/GuGuDan";
import WordRelay from "./LastGames/03WordRelay/WordRelay";
import NumberBaseball from "./LastGames/04NumberBaseball/WithHooksNumberBaseball";
import ResponseCheck from "./LastGames/05ResponseCheck/WithHooksResponseCheck";
import RSP from "./LastGames/06RSP/WithHooksRSP";
import Lotto from "./LastGames/07Lotto/WithHooksLotto";
import TicTacToe from "./LastGames/08TicTacToe/TicTacToe";
import MineSearch from "./LastGames/09MineSearch/MineSearch";

export default function GameMatcher({ match }) {
  const [nickname, setNickname] = useState("");
  const [value, setValue] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setNickname(value);
    setValue("");
    localStorage.setItem("nickname", value);
  };
  const onReset = (e) => {
    e.preventDefault();
    localStorage.removeItem("nickname");
    setNickname("");
  };
  const savedName = localStorage.getItem("nickname");
  if (savedName && !nickname) {
    setNickname(savedName);
  }
  if (match.params.name === "like-button") {
    return <LikeButton nickname={nickname} />;
  } else if (match.params.name === "gugudan") {
    return <GuGuDan nickname={nickname} />;
  } else if (match.params.name === "word-relay") {
    return <WordRelay nickname={nickname} />;
  } else if (match.params.name === "number-baseball") {
    return <NumberBaseball nickname={nickname} />;
  } else if (match.params.name === "response-check") {
    return <ResponseCheck nickname={nickname} />;
  } else if (match.params.name === "rock-scissors-paper") {
    return <RSP nickname={nickname} />;
  } else if (match.params.name === "lotto-generator") {
    return <Lotto nickname={nickname} />;
  } else if (match.params.name === "tic-tac-toe") {
    return <TicTacToe nickname={nickname} />;
  } else if (match.params.name === "mine-search") {
    return <MineSearch nickname={nickname} />;
  }
  return (
    <>
      {" "}
      <div className="nickname">
        {" "}
        {nickname && (
          <div>
            <h1 className="greeting">안녕하세요 {nickname}님</h1>
            <button type="text" onClick={onReset}>
              이름 다시 짓기
            </button>
          </div>
        )}
        {!nickname && (
          <form className="nameInput" onSubmit={onSubmit}>
            <input type="text" value={value} onChange={onChange} />
            <button type="submit">입력</button>
          </form>
        )}
      </div>
    </>
  );
}

// class GameMatcher extends Component {
//   render() {
//     console.log(this.props);
//     console.log("aaa");
//     if (this.props.match.params.name === "like-button") {
//       return <LikeButton />;
//     } else if (this.props.match.params.name === "gugudan") {
//       return <GuGuDan />;
//     } else if (this.props.match.params.name === "word-relay") {
//       return <WordRelay />;
//     } else if (this.props.match.params.name === "number-baseball") {
//       return <NumberBaseball />;
//     } else if (this.props.match.params.name === "response-check") {
//       return <ResponseCheck />;
//     } else if (this.props.match.params.name === "rock-scissors-paper") {
//       return <RSP />;
//     } else if (this.props.match.params.name === "lotto-generator") {
//       return <Lotto />;
//     } else if (this.props.match.params.name === "tic-tac-toe") {
//       return <TicTacToe />;
//     } else if (this.props.match.params.name === "mine-search") {
//       return <MineSearch />;
//     }
//     return <></>;
//   }
// }

// export default GameMatcher;
