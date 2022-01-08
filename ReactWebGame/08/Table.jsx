import React from "react";
import Tr from "./Tr";

export default function Table({ onClick, tableData }) {
  return (
    <table onClick={onClick}>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr rowData={tableData[i]} />
          ))}
      </tbody>
    </table>
  );
}
