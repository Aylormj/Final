export default function Scoreboard({ score }) {
  return (
    <div>
      <div>
        Player Score: <span id="score-player">{score.player}</span>
      </div>
      <div>
        CPU Score: <span id="score-cpu">{score.cpu}</span>
      </div>
      <div>
        Ties: <span id="score-ties">{score.ties}</span>
      </div>
    </div>
  );
}