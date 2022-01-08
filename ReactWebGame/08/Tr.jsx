import React from "react";
import Td from "./Td";

export default function Tr({ rowData }) {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td) => (
          <Td />
        ))}
    </tr>
  );
}
