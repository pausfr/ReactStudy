import React from "react";
import Td from "./Td";

export default function Tr({ rowData, rowIndex, dispatch }) {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            rowIndex={rowIndex}
            cellIndex={i}
            dispatch={dispatch}
            cellData={rowData[i]}
          />
        ))}
    </tr>
  );
}
