import { useNavigate } from "react-router-dom";
import { generateRoomCode } from "../utils/generateRoomCode";
import mainMenuBg from "../assets/images/Main Menu.png";
import socket from "../socket"; // 👈 Make sure this is imported

function HomeScreen() {
  const navigate = useNavigate();

  const handleHost = () => {
  const roomCode = generateRoomCode();
  socket.emit("host-room", { roomCode }); // ✅ Emit host-room so server creates lobby
  navigate(`/host/${roomCode}`, { state: { roomCode, isHost: true } });
};

  const handleJoin = () => {
    navigate("/join");
  };

  return (
    <div className="home-screen">
      <img src={mainMenuBg} alt="Main Menu Background" className="main-bg" />
      <div className="menu-buttons">
        <button onClick={handleHost}>Host Game</button>
        <button onClick={handleJoin}>Join Game</button>
      </div>
    </div>
  );
}

export default HomeScreen;
