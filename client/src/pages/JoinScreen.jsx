import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function JoinScreen() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomCode || !name) return;
    socket.emit("join-room", { roomCode, playerName: name }); // ✅ playerName, not name
    navigate(`/player/${roomCode}`);
  };

  return (
    <div className="app-container">
      <h2 className="title">Join a Game</h2>
      <div className="join-form">
        <input
          className="join-input"
          type="text"
          placeholder="Room Code"
          maxLength={6}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        />
        <input
          className="join-input"
          type="text"
          placeholder="Your Name"
          maxLength={16}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="join-button" onClick={handleJoin}>Join Game</button>
      </div>
    </div>
  );
}

export default JoinScreen;
