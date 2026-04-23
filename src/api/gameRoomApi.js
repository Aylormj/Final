const BASE_URL = "https://game-room-api.fly.dev/api/rooms";

async function api(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

// Create a room with an initial game state
export function createRoom() {
  return api("", {
    method: "POST",
    body: JSON.stringify({
      initialState: {
        secret: Math.floor(Math.random() * 20) + 1,
        lastGuess: null,
        feedback: "",
        winner: null,
      },
    }),
  });
}

// Get room state
export function getRoom(roomId) {
  return api(`/${roomId}`);
}

// Update room state
export function updateRoom(roomId, gameState) {
  return api(`/${roomId}`, {
    method: "PUT",
    body: JSON.stringify({ gameState }),
  });
}
