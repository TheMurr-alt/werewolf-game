function PlayerList({ players }) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
}

export default PlayerList;
