import React, {
  useEffect,
  useState,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  createContext,
} from "react";
import Table from "./Table";
import Form from "./Form";

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: false,
});
export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened가 되게 (예를 들어 지뢰가 근처 칸에 1개 있으면 1을 표시)
};

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: true, // 게임 중단 지뢰 터쳤을 때
  openedCount: 0,
  data: { row: 0, cell: 0, mine: 0 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        data: { row: action.row, cell: action.cell, mine: action.mine },
        openedCount: 0,
        timer: 0,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      let openedCount = 0;

      const checked = [];
      // 체크어라운드 함수 ~
      const checkAround = (row, cell) => {
        // 열림, 플래그 지정, 퀘스쳔마크 지정일 경우 열지 필터링(함수 작동 안함)
        if (
          [
            CODE.OPENED,
            CODE.FLAG_MINE,
            CODE.FLAG,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        ) {
          return;
        }
        // 상하좌우 칸이 아닌 경우 필터링(함수 작동 안함)
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return;
        }
        // 이미 검사한 칸인 경우 필터링(함수 작동 안함)
        if (checked.includes(row + "," + cell)) {
          return;
        } else {
          // checked 배열에 방문 기록
          checked.push(row + "," + cell);
        }
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        // 필터시 좌우칸이 언디파인드면 사라짐
        const count = around.filter((v) => {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;

        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      // ~ 체크어라운드 함수

      checkAround(action.row, action.cell);
      // 승리
      let halted = false;
      let result = "";
      if (
        state.data.row * state.data.cell - state.data.mine ===
        state.openedCount + openedCount
      ) {
        halted = true;
        result = `${state.timer}초 만에 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        result,
        halted,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  // 셔플 배열에 지뢰가 들어갈 자리를 미리 정해둠
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  // 모든 칸을 노말 칸으로 먼저 생성함
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    // 좌표를 계산하기 위한 코드
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    // 지뢰를 심기
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

export default function MineSearch({ nickname }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted } = state;

  const value = useMemo(
    () => ({
      tableData,
      halted,
      dispatch,
    }),
    [tableData]
  );

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);
  return (
    <TableContext.Provider value={value}>
      <div className="gameGreeting">{nickname}님 지뢰찾기 최단시간 도전</div>
      <div className="game">
        <Form />
        <div>타이머: {timer}</div>
        <Table />
        <div>{result}</div>
      </div>
    </TableContext.Provider>
  );
}
