import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
import { Avatar } from "antd";
import Pubnub from "pubnub";
import "./style.css";

const myID = `${Date.now()}`;

const pubnub = new Pubnub({
  publishKey: "pub-c-dd97f012-fbbf-4407-91d6-7038140cf97f",
  subscribeKey: "sub-c-f0bbbc0c-9936-4fa9-b3b1-16371181aa10",
  secretKey: "sec-c-OTQ0ZDI1MmEtYzc4YS00ZjI0LThiZGMtYzg2OWJhMjgyYWRi",
  userId: myID,
});

const ChatPage: React.FC = () => {
  const { roomCode } = useParams();

  const [typedMessage, setTypedMessage] = useState<string>("");
  const [messages, setMessages] = useState<Pubnub.MessageEvent[]>([]);

  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roomCode) {
      console.log(`Subscribe to ${roomCode}`);
      pubnub.subscribe({
        channels: [roomCode],
      });

      return () => {
        console.log(`Unsubscribe from ${roomCode}`);
        pubnub.unsubscribe({
          channels: [roomCode],
        });
      };
    }
  }, [roomCode]);

  useEffect(() => {
    if (messages && messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (roomCode) {
      const listner = {
        message: (messageEvent: Pubnub.MessageEvent) => {
          console.log(`New message rec`, messageEvent);
          setMessages((prevMessages) => [...prevMessages, messageEvent]);
        },
      };
      pubnub.addListener(listner);
      return () => {
        pubnub.removeListener(listner);
      };
    }
  }, [roomCode]);

  const handleSendMessage = useCallback(() => {
    if (typedMessage && roomCode) {
      pubnub.publish({
        channel: roomCode,
        message: typedMessage,
      });
      setTypedMessage("");
    }
  }, [roomCode, typedMessage]);

  return (
    <div>
      <h1>Chat App {roomCode}</h1>
      <div ref={messageContainer} className="messages">
        {messages.map((message) => (
          <div
            className={message.publisher === myID ? "my-message" : ""}
            key={message.timetoken}
          >
            <Avatar
              style={{ backgroundColor: message.publisher === myID ? '#1890ff' : '#f56a00' }}
              size="large"
            >
              {message.publisher === myID ? 'Me' : 'U'}
            </Avatar>
            <div>{message.message}</div>
            <div className="message-time">
              {new Date(parseInt(message.timetoken) / 10000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <div style={{ display: "flex", gap: "8px" }}>
        <Input
          value={typedMessage}
          onPressEnter={handleSendMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <Button
          onClick={handleSendMessage}
          disabled={typedMessage === ""}
          type="primary"
        >
          Send
        </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;