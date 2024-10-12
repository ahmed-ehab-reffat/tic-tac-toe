import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";

const PLAYERS = {
  X: "player 1",
  O: "player 2",
};

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function changePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") currentPlayer = "O";
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_BOARD.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveGameWinner(gameBoard, players) {
  let winner;
  for (const compination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[compination[0].row][compination[0].column];
    const secondSquare = gameBoard[compination[1].row][compination[1].column];
    const thirdSquare = gameBoard[compination[2].row][compination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const ActivePlayer = changePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveGameWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleTurns(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = changePlayer(prevGameTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, name) {
    setPlayers((prevNames) => {
      return {
        ...prevNames,
        [symbol]: name,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={ActivePlayer === "X"}
            onChangeName={handlePlayerName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={ActivePlayer === "O"}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onrestart={handleRestart} />
        )}
        <GameBoard switchPlayer={handleTurns} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
