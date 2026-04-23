import MoveButtons from "./MoveButtons.jsx";
import Scoreboard from "./Scoreboard.jsx";
import GameHistory from "./GameHistory.jsx";

function cpuMove() {
  const moves = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * moves.length)];
}

function winner(player, cpu) {
  if (player === cpu) return "tie";
  if (
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")
  ) {
    return "player";
  }
  return "cpu";
}

export default function GameBoard({
  difficulty,
  score,
  history,
  onRoundResult,
  onReset,
}) {
  function handleMove(move) {
    const cpu = cpuMove();
    const w = winner(move, cpu);

    const summary = `Player(${move}) vs CPU(${cpu})`;

    onRoundResult({
      outcome: w,
      summary,
    });
  }

  return (
    <div>
      <MoveButtons onMove={handleMove} />
      <Scoreboard score={score} />
      <GameHistory history={history} />
      <button id="reset-game" onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
}