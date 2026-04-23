export const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

/**
 * Determines the winner of a Rock Paper Scissors round
 * @param {string} player - Player's move ('rock', 'paper', 'scissors')
 * @param {string} cpu - CPU's move ('rock', 'paper', 'scissors')
 * @returns {string} - 'player', 'cpu', or 'tie'
 */
export function decideWinner(player, cpu) {
  if (player === cpu) return "tie";
  return beats[player] === cpu ? "player" : "cpu";
}

// CPU move selection with optional "hard" bias towards beating lastPlayerMove.
/**
 * Generates a CPU move based on difficulty level
 * @param {Object} options - Options object
 * @param {string} options.difficulty - 'easy', 'normal', or 'hard'
 * @param {string|null} options.lastPlayerMove - Player's previous move (for hard difficulty)
 * @returns {string} - CPU's move ('rock', 'paper', 'scissors')
 */
export function getCpuMove({ difficulty = "normal", lastPlayerMove = null } = {}) {
  const moves = ["rock", "paper", "scissors"];
  if (difficulty !== "hard" || !lastPlayerMove) {
    return moves[Math.floor(Math.random() * 3)];
  }
  const counter = { rock: "paper", paper: "scissors", scissors: "rock" }[lastPlayerMove];
  // 60% choose counter, 40% random
  return Math.random() < 0.6 ? counter : moves[Math.floor(Math.random() * 3)];
}

// Helper for score math
/**
 * Calculates the new score based on the game outcome
 * @param {Object} prev - Previous score object { player: number, cpu: number, ties: number }
 * @param {number} prev.player
 * @param {number} prev.cpu
 * @param {number} prev.ties
 * @param {string} outcome - Game outcome ('player', 'cpu', 'tie')
 * @returns {Object} - New score object
 */
export function nextScore(prev, outcome) {
  const s = { ...prev };
  if (outcome === "player") s.player++;
  else if (outcome === "cpu") s.cpu++;
  else s.ties++;
  return s;
}
