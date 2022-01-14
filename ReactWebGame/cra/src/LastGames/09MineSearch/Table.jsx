import React, { useContext, memo } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";

export default memo(function Table({}) {
  const { tableData } = useContext(TableContext);
  return (
    <table id="table">
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
});
