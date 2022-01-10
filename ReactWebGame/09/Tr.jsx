import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Td from "./Td";

export default function Tr({ rowIndex }) {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill()
          .map((td, i) => <Td rowIndex={rowIndex} cellIndex={i} />)}
    </tr>
  );
}
