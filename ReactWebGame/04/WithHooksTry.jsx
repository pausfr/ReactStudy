import React from "react";

const Try = (props) => {
  return (
    <li>
      <div>{props.tryInfo.try}</div>
      <div>{props.tryInfo.result}</div>
    </li>
  );
};
export default React.memo(Try);
