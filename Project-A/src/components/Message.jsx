import React from "react";

function Message({ message, isSent }) {
  const messageStyle = {
    maxWidth: "60%",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: isSent ? "#031636" : "#1A1A1A", // Dark blue or very dark gray for received
    color: "#FFFFFF", // White text
    alignSelf: isSent ? "flex-end" : "flex-start",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
    wordWrap: "break-word",
  };

  return (
    <div style={messageStyle}>
      <p>{message.message}</p>
      <small>{new Date(message.time).toLocaleString()}</small>
    </div>
  );
}

export default Message;
