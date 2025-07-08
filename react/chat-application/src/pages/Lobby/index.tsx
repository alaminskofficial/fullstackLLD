import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import "./style.css";

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState<string>("");

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${roomCode}`);
  }, [navigate, roomCode]);

  return (
    <div className="lobby-container">
      <div>
        <h1>Please enter Room Code</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            type="text"
            placeholder="Example: codershub"
          />
          <Button onClick={handleJoinRoom} disabled={roomCode === ""}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
