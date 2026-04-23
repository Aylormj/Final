export default function AvatarSelector({ value, onChange }) {
  const AVATARS = [
    { id: "wizard", name: "Wizard" },
    { id: "knight", name: "Knight" },
    { id: "ninja", name: "Ninja" },
    { id: "pirate", name: "Pirate" },
  ];

  const selected = value || "wizard";

  return (
    <fieldset>
      <legend>Choose Avatar</legend>

      {AVATARS.map((a) => (
        <label key={a.id} className="avatar-option">
          <input
            type="radio"
            name="avatar"
            value={a.id}                 // EXACT: wizard/knight/etc
            checked={selected === a.id}
            onChange={(e) => onChange(e.target.value)}
          />
          {a.name}
        </label>
      ))}
    </fieldset>
  );
}