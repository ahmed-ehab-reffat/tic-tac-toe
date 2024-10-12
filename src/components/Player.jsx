import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, name);
    }
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function myFunc(e) {
    if (e.key === "Enter") handleEditClick();
  }

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = (
      <input
        type="text"
        required
        value={name}
        onChange={handleName}
        onKeyUp={myFunc} //() => myFunc(event)
        autoFocus
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
