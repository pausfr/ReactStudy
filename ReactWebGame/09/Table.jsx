import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";

export default function Table({}) {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
}
