import { useNavigate } from "react-router-dom";

export default function Hub() {
  const navigate = useNavigate();
  const name = localStorage.getItem("playerName") || "Guest";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to GameHub</h1>
      <h2>Player: {name}</h2>
      <input
        placeholder="Enter your name"
        onChange={(e) => localStorage.setItem("playerName", e.target.value)}
      />
      <br /><br />
      <button onClick={() => navigate("/rps")}>Rock Paper Scissors</button>
      <br /><br />
      <button onClick={() => navigate("/tictactoe")}>Tic Tac Toe</button>
      <br /><br />
      <button onClick={() => navigate("/wordle")}>Wordle</button>
      <br /><br />
      <button onClick={() => navigate("/number-duel")}> Number Guess Duel (Multiplayer) </button>
    </div>
  );
}
