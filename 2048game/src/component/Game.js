import React from "react";
import times from 'lodash/times';
import {MAX_POS} from "../constant";
import {useState} from "react/cjs/react.development";
import { getInitialTileList } from "../util/tile";
import useMoveTile from "../hook/useMoveTile";
import Tile from "./Tile";

export default function Game({setScore}) {
    const [tileList, setTileList] = useState(getInitialTileList);
    // up, down, left, right 키를 훅을 이용해서 로직 구현
    // 코드 커지는 걸 방지.
    useMoveTile({tileList, setTileList, setScore});
    return (
        <div className="game-container">
            <div className="grid-container">
                {
                    times(MAX_POS, index1 => (
                        <div key = {index1} className="grid-row">
                            {times(MAX_POS, index2 => (
                                <div key = {index2} className="grid-cell"></div>))}
                        </div>

                    ))
                }
            </div>

            <div className="tile-container">
                {
                    tileList.map(item => (
                        <Tile key={item.id} {...item} />
                    ))
                }
            </div>
        </div>
    );
}