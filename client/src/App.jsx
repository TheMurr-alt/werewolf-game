import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import JoinScreen from "./pages/JoinScreen";
import HostLobby from "./pages/HostLobby";
import PlayerLobby from "./pages/PlayerLobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/join" element={<JoinScreen />} />
        <Route path="/host/:roomCode" element={<HostLobby />} />
        <Route path="/player/:roomCode" element={<PlayerLobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
