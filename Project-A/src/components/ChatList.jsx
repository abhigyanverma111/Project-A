import React from "react";
import ChatListing from "./ChatListing";

export default function ChatList({ chats }) {
  const containerStyle = {
    width: "30vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const listStyle = {
    flex: 1,
    overflowY: "auto",
  };

  return (
    <div style={containerStyle}>
      <div style={listStyle}>
        {chats.map((chat) => (
          <div key={chat.id}>
            <ChatListing chat={chat} />
          </div>
        ))}
      </div>
    </div>
  );
}
