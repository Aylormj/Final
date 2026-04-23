import { useEffect, useState } from "react";
import { createRoom, getRoom, updateRoom } from "./api/gameRoomApi.js";

const POLL_MS = 1000;

export default function NumberGuessDuel({ playerName, onBack }) {
  const [roomId, setRoomId] = useState("");
  const [step, setStep] = useState("lobby"); // lobby | waiting | playing | result
  const [status, setStatus] = useState("");
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState(null);

  // Poll room state
  useEffect(() => {
    if (!roomId || step === "lobby") return;

    let cancelled = false;

    async function poll() {
      try {
        const data = await getRoom(roomId);
        if (cancelled) return;

        const state = data.gameState;
        setGameState(state);

        if (state.winner) {
          setStep("result");
        } else if (step === "waiting") {
          setStep("playing");
        }
      } catch (err) {
        console.error(err);
        setStatus("Error syncing room");
      }
    }

    const id = setInterval(poll, POLL_MS);
    poll();

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [roomId, step]);

  async function handleCreate() {
    try {
      setStatus("Creating room...");
      const res = await createRoom();
      setRoomId(res.roomId);
      setGameState(res.gameState);
      setStatus(`Room created. Share code: ${res.roomId}`);
      setStep("waiting");
    } catch {
      setStatus("Failed to create room");
    }
  }

  async function handleJoin() {
    if (!roomId.trim()) return setStatus("Enter a room code");

    try {
      setStatus("Joining room...");
      const data = await getRoom(roomId.trim());
      setGameState(data.gameState);
      setStatus("Joined room!");
      setStep("playing");
    } catch {
      setStatus("Room not found");
    }
  }

  async function handleGuess() {
    const n = Number(guess);
    if (!n || n < 1 || n > 20) return setStatus("Enter a number 1–20");

    const newState = { ...gameState, lastGuess: n };

    if (n === gameState.secret) {
      newState.feedback = "Correct!";
      newState.winner = playerName;
    } else if (n < gameState.secret) {
      newState.feedback = "Too low!";
    } else {
      newState.feedback = "Too high!";
    }

    await updateRoom(roomId, newState);
    setGuess("");
  }

  function resetGame() {
    const newState = {
      secret: Math.floor(Math.random() * 20) + 1,
      lastGuess: null,
      feedback: "",
      winner: null,
    };
    updateRoom(roomId, newState);
    setGameState(newState);
    setStep("playing");
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Number Guess Duel</h1>
        <button onClick={onBack}>Back</button>
      </div>

      {step === "lobby" && (
        <>
          <button onClick={handleCreate}>Create Room</button>

          <div style={{ marginTop: "1rem" }}>
            <input
              placeholder="Room code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={handleJoin}>Join</button>
          </div>
        </>
      )}

      {roomId && <div>Room ID: <code>{roomId}</code></div>}

      <div style={{ margin: "0.5rem 0" }}>{status}</div>

      {step === "playing" && gameState && (
        <>
          <div>{gameState.feedback}</div>

          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="1–20"
          />
          <button onClick={handleGuess}>Guess</button>
        </>
      )}

      {step === "result" && (
        <>
          <h2>{gameState.winner === playerName ? "You win!" : `${gameState.winner} wins!`}</h2>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </section>
  );
}
