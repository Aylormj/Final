import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hub from "./hub.jsx";
import Game from "./components/Game.jsx"; // Rock Paper Scissors
import WordlePage from "./WordlePage.jsx";
import TicTacToe from "./TicTacToe.jsx";
import NumberGuessDuel from "./NumberGuessDuel.jsx"; // NEW GAME

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/rps" element={<Game />} />
        <Route path="/wordle" element={<WordlePage />} />
        <Route path="/tictactoe" element={<TicTacToe />} />

        {/* NEW MULTIPLAYER GAME */}
        <Route path="/number-duel" element={<NumberGuessDuel />} />
      </Routes>
    </Router>
  );
}
