export default function GameHistory({ history }) {
  return (
    <div>
      <h2>History</h2>
      <ul id="history">
        {history.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
}