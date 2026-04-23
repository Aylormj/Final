export default function WordlePage() {
  const name = localStorage.getItem("playerName") || "Guest";

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Wordle</h1>
      <h2>Player: {name}</h2>

      <iframe
        src="/Wordle/index.html"
        style={{
          width: "100%",
          height: "90vh",
          border: "none"
        }}
        title="Wordle Game"
      />
    </div>
  );
}
