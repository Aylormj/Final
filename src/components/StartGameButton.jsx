export default function StartGameButton({ isEnabled, onStart }) {
  return (
    <button
      id="start-game"
      type="button"
      disabled={!isEnabled}
      onClick={() => {
        if (isEnabled) onStart();
      }}
    >
      Start Game
    </button>
  );
}