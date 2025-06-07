import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import PlayerList from "../components/PlayerList";

function PlayerLobby() {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("player-joined", (player) => {
      setPlayers((prev) => [...prev, player]);
      if (player.id === socket.id) setIsHost(player.isHost);
    });

    socket.on("game-started", () => {
      setGameStarted(true);
    });

    return () => {
      socket.off("player-joined");
      socket.off("game-started");
    };
  }, []);

  const startGame = () => {
    socket.emit("start-game", roomCode);
  };

  return (
    <div className="app-container">
      <h2>Lobby: {roomCode}</h2>
      <PlayerList players={players} />
      {gameStarted ? (
        <p>🕹️ Game is starting...</p>
      ) : (
        <>
          <p>Waiting for host to start game...</p>
          {isHost && <button onClick={startGame}>Start Game</button>}
        </>
      )}
    </div>
  );
}

export default PlayerLobby;
