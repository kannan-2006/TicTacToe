import React, { useEffect, useState } from "react";
import "./index.css";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [square, setSquare] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");

  const getWinner = (square) => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPattern.length; i++) {
      const [x, y, z] = winningPattern[i];

      if (
        square[x] !== "" &&
        square[x] === square[y] &&
        square[x] === square[z]
      ) {
        return square[x];
      }
    }

    return null;
  };

  useEffect(() => {
    const winner = getWinner(square);

    if (winner) {
      setStatus(`${winner} is the winner`);
    } else if (square.every((item) => item !== "")) {
      setStatus("It's a draw!");
    }
  }, [square]);

  const handleOnClick = (index) => {
    // Stop the game if there is a winner or draw
    if (status) return;

    const cpySquare = [...square];

    // Don't allow an already filled square
    if (cpySquare[index] !== "") return;

    cpySquare[index] = isXTurn ? "X" : "O";

    setSquare(cpySquare);
    setIsXTurn((prev) => !prev);
  };

  const handleRestart = () => {
    setSquare(Array(9).fill(""));
    setIsXTurn(true);
    setStatus("");
  };

  return (
    <div className="container">
      <h2>{status ? status : `${isXTurn ? "X" : "O"}'s Turn`}</h2>

      <div className="row">
        <Square value={square[0]} onClick={() => handleOnClick(0)} />
        <Square value={square[1]} onClick={() => handleOnClick(1)} />
        <Square value={square[2]} onClick={() => handleOnClick(2)} />
      </div>

      <div className="row">
        <Square value={square[3]} onClick={() => handleOnClick(3)} />
        <Square value={square[4]} onClick={() => handleOnClick(4)} />
        <Square value={square[5]} onClick={() => handleOnClick(5)} />
      </div>

      <div className="row">
        <Square value={square[6]} onClick={() => handleOnClick(6)} />
        <Square value={square[7]} onClick={() => handleOnClick(7)} />
        <Square value={square[8]} onClick={() => handleOnClick(8)} />
      </div>

      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default TicTacToe;
