import { useMemo, useState } from "react";
import GameBoard from "./GameBoard.jsx";

export default function Game({ settings, onBack }) {
  const name = settings?.name ?? "Player";
  const difficulty = settings?.difficulty ?? "normal";

  const greeting = useMemo(() => `Hello, ${name}!`, [name]);

  const [score, setScore] = useState({ player: 0, cpu: 0, ties: 0 });
  const [history, setHistory] = useState([]);

  function onRoundResult({ outcome, summary }) {
    setScore((s) => {
      if (outcome === "player") return { ...s, player: s.player + 1 };
      if (outcome === "cpu") return { ...s, cpu: s.cpu + 1 };
      return { ...s, ties: s.ties + 1 };
    });
    setHistory((h) => [...h, summary]);
  }

  function resetGame() {
    setScore({ player: 0, cpu: 0, ties: 0 });
    setHistory([]);
    // DO NOT clear localStorage (tests expect settings to remain)
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <h1>Rock Paper Scissors</h1>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </div>

      <div data-testid="greeting">{greeting}</div>

      <div>
        Difficulty: <span id="current-difficulty">{difficulty}</span>
      </div>

      <GameBoard
        difficulty={difficulty}
        score={score}
        history={history}
        onRoundResult={onRoundResult}
        onReset={resetGame}
      />
    </section>
  );
}