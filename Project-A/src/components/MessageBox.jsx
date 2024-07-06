// MessageBox.jsx
import React, { useState } from "react";

export default function MessageBox({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await onSendMessage(message); // Pass message to parent component for sending
      setMessage(""); // Clear message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="message-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
