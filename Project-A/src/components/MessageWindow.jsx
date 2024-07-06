// MessageWindow.jsx
import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import "./../public/MessageWindow.css";

export default function MessageWindow({ current }) {
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:4000/api/messageretrieval",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user2: current,
            }),
          }
        );
        const data = await response.json();
        setMessageArray(data.messageArray);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(); // Initial fetch

    const intervalId = setInterval(fetchMessages, 10000); // Fetch messages every 10 seconds

    return () => clearInterval(intervalId); // Cleanup the interval
  }, [current]);

  const handleSendMessage = async (newMessage) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/sendmessage", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: current,
          message: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "approved") {
        // Update messageArray with the sender's name immediately
        setMessageArray((prevMessages) => [
          ...prevMessages,
          { sender: data.sender, message: newMessage, receiver: current },
        ]);
      } else {
        console.error("Message sending failed:", data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return (
      <div id="containing" className="message-window">
        Loading...
      </div>
    );
  }

  if (current == null) {
    return (
      <div id="containing" className="message-window">
        Click on a user to view/send messages
      </div>
    );
  }

  return (
    <div id="containing" className="message-window">
      {messageArray.length > 0 ? (
        messageArray.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            {message.message}
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
      <MessageBox current={current} onSendMessage={handleSendMessage} />
    </div>
  );
}
