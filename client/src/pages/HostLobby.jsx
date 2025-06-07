import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";

function HostLobby() {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("get-players", roomCode);

    const handlePlayerList = (playerList) => {
      setPlayers(playerList);
    };

    socket.on("player-list-updated", handlePlayerList);

    return () => {
      socket.off("player-list-updated", handlePlayerList);
    };
  }, [roomCode]);

  return (
    <div className="lobby-screen">
      <div className="app-container">
        <h2 className="title">Room Code: {roomCode}</h2>
        <p className="subtitle">Waiting for players...</p>
        <ul className="player-list">
          {players.map((player, index) => (
            <li key={index} className="player-name">{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HostLobby;
