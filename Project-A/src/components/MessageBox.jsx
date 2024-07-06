import React, { useState } from "react";

export default function MessageBox({ current, onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:4000/api/sendmessage", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: current,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "approved") {
        onSendMessage(message);
        setMessage("");
      } else {
        console.error("Message sending failed:", data.message);
      }
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
