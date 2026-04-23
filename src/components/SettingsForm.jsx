import AvatarSelector from "./AvatarSelector.jsx";

export default function SettingsForm({ value, onChange }) {
  function setField(key, nextValue) {
    onChange({ ...value, [key]: nextValue });
  }

  return (
    <div>
      <div>
        <label htmlFor="player-name">Player Name</label>
        <input
          id="player-name"
          type="text"
          value={value.name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </div>

      <AvatarSelector
        value={value.avatar}
        onChange={(nextAvatar) => setField("avatar", nextAvatar)}
      />

      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={value.difficulty}
          onChange={(e) => setField("difficulty", e.target.value)}
        >
          <option value="easy">easy</option>
          <option value="normal">normal</option>
          <option value="hard">hard</option>
        </select>
      </div>

      <div>
        <label htmlFor="theme-toggle">Dark Mode</label>
        <input
          id="theme-toggle"
          type="checkbox"
          checked={value.darkMode}
          onChange={(e) => setField("darkMode", e.target.checked)}
        />
      </div>
    </div>
  );
}