import { useEffect, useState } from "react";
import SettingsForm from "./SettingsForm.jsx";
import StartGameButton from "./StartGameButton.jsx";

export default function Lobby({ settings, onSave, onStart }) {
  const [draft, setDraft] = useState({
    name: "",
    avatar: "wizard",   // default avatar required for tests
    difficulty: "normal",
    darkMode: false,
  });

  const [isSaved, setIsSaved] = useState(false);

  // Load from storage
  useEffect(() => {
    if (!settings) return;

    setDraft({
      name: settings.name ?? "",
      avatar: settings.avatar ?? "wizard",
      difficulty: settings.difficulty ?? "normal",
      darkMode: !!settings.darkMode,
    });

    setIsSaved(true);
  }, [settings]);

  function handleChange(nextDraft) {
    setDraft(nextDraft);
    setIsSaved(false);
  }

  function handleSave() {
    const cleaned = {
      name: draft.name.trim(),
      avatar: draft.avatar,
      difficulty: draft.difficulty,
      darkMode: draft.darkMode,
    };

    localStorage.setItem("game.settings", JSON.stringify(cleaned));
    onSave(cleaned);
    setIsSaved(true);
  }

  return (
    <section>
      <h1>Game Lobby</h1>

      {/* Greeting MUST reflect input immediately */}
      <div data-testid="greeting">
        {draft.name ? `Hello, ${draft.name}!` : "Hello!"}
      </div>

      <SettingsForm value={draft} onChange={handleChange} />

      <button id="save-settings" onClick={handleSave}>
        Save Settings
      </button>

      <StartGameButton isEnabled={isSaved} onStart={onStart} />
    </section>
  );
}