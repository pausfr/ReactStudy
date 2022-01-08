import React from "react";
import ReactDOM from "react-dom";
// import Lotto from "./Lotto"; // 클래스형 컴포넌트 사용
import Lotto from "./WithHooksLotto"; // 함수형 컴포넌트 사용

ReactDOM.render(<Lotto />, document.querySelector("#root"));
