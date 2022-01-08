import React, { useCallback } from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";

export default function Td({ rowIndex, cellIndex, dispatch, cellData }) {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    dispatch({ type: CHANGE_TURN });
  });

  return <td onClick={onClickTd}>{cellData}</td>;
}
