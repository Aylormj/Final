export default function MoveButtons({ onMove }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", margin: "1rem 0" }}>
      <button type="button" data-move="rock" onClick={() => onMove("rock")}>
        Rock
      </button>
      <button type="button" data-move="paper" onClick={() => onMove("paper")}>
        Paper
      </button>
      <button type="button" data-move="scissors" onClick={() => onMove("scissors")}>
        Scissors
      </button>
    </div>
  );
}