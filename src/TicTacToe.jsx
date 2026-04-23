import { useState } from "react";

export default function TicTacToe() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xTurn, setXTurn] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);
  }

  function resetGame() {
    setBoard(emptyBoard);
    setXTurn(true);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Tic Tac Toe</h1>
      <h2>{winner ? `Winner: ${winner}` : `Turn: ${xTurn ? "X" : "O"}`}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
          margin: "20px auto"
        }}
      >
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              cursor: "pointer"
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={resetGame} style={{ padding: "10px 20px", fontSize: "1rem" }}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
