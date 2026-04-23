// Handle localStorage for settings/highscores

/**
 * Saves settings object to localStorage
 * @param {Object} settings - Settings object to save
 * @param {string} settings.name - Player name
 * @param {string} settings.avatar - Selected avatar
 * @param {string} settings.difficulty - Game difficulty ('easy', 'normal', 'hard')
 * @param {string} settings.theme - Theme ('light' or 'dark')
 */
export function saveSettings(settings) {
  localStorage.setItem('game.settings', JSON.stringify(settings));
}

/**
 * Loads settings from localStorage
 * @returns {Object|null} - Settings object or null if not found/invalid
 */
export function loadSettings() {
  const raw = localStorage.getItem('game.settings');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

/**
 * Loads highscores array from localStorage
 * @returns {Array} - Array of highscores (empty array if none found)
 */
export function getHighscores() {
  try { return JSON.parse(localStorage.getItem('game.highscores') || '[]'); } catch { return []; }
}

/**
 * Saves highscores array to localStorage
 * @param {Array} list - Array of highscores to save
 */
export function setHighscores(list) {
  localStorage.setItem('game.highscores', JSON.stringify(list));
}
