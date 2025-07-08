import React from "react";
import { Routes, Route } from "react-router-dom";
import "./style.css";

import LobbyPage from "./pages/Lobby";
import ChatPage from "./pages/Chat";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/room/:roomCode" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
