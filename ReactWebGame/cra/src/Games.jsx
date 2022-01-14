import React, { useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import GameMatcher from "./GameMatcher";
import { Nav, Navbar } from "react-bootstrap";
const Games = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand href="/">
              <img
                src={require("./LastGames/06RSP/img/scissors.png")}
                width="20px"
                height="20px"
              />
              홈
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/game/like-button">좋아요 버튼</Nav.Link>&nbsp;
                <Nav.Link href="/game/gugudan">구구단</Nav.Link>&nbsp;
                <Nav.Link href="/game/word-relay">끝말잇기</Nav.Link>&nbsp;
                <Nav.Link href="/game/number-baseball">숫자야구</Nav.Link>&nbsp;
                <Nav.Link href="/game/response-check">반응속도 체크</Nav.Link>
                &nbsp;
                <Nav.Link href="/game/rock-scissors-paper">가위바위보</Nav.Link>
                &nbsp;
                <Nav.Link href="/game/lotto-generator">로또추첨기</Nav.Link>
                &nbsp;
                <Nav.Link href="/game/tic-tac-toe">틱택토</Nav.Link>&nbsp;
                <Nav.Link href="/game/mine-search">지뢰찾기</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <GameMatcher {...props} />}
            />
            <Route
              path="/game/:name"
              render={(props) => <GameMatcher {...props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Games;
