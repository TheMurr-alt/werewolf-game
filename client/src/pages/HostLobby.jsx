import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket"; // ✅ CORRECT
import "../index.css";

const HostLobby = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomCode, isHost } = location.state || {};
  const [players, setPlayers] = useState([]);

  useEffect(() => {
  socket.emit("get-players", roomCode);

  const handleRoomState = ({ players }) => {
    setPlayers(players);
  };

  socket.on("room-state", handleRoomState);

  return () => {
    socket.off("room-state", handleRoomState);
  };
}, [roomCode]);

  const handleStartGame = () => {
    socket.emit("start-game", roomCode);
  };

  return (
    <div className="lobby-screen">
      <div className="app-container">
        <h2>Room Code: <span style={{ color: "#ffcc00" }}>{roomCode}</span></h2>
        <h3>Waiting for Players...</h3>
        <div className="player-list">
          {players.map((player, idx) => (
            <div key={idx} className="player-name">{player.name}</div>
          ))}
        </div>
        {isHost && (
          <button onClick={handleStartGame}>Start Game</button>
        )}
      </div>
    </div>
  );
};

export default HostLobby;
