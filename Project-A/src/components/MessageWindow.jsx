import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import "./../public/MessageWindow.css";

export default function MessageWindow({ current }) {
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:4000/api/messageretrieval", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user2: current,
        }),
      });
      const data = await response.json();
      setMessageArray(data.messageArray);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect for initial fetch and cleanup
  useEffect(() => {
    fetchMessages(); // Initial fetch
    const intervalId = setInterval(fetchMessages, 10000); // Fetch messages every 10 seconds

    return () => clearInterval(intervalId); // Cleanup the interval
  }, [current]);

  // Function to handle sending messages
  const handleSendMessage = (newMessage) => {
    setMessageArray((prevArray) => [
      ...prevArray,
      { sender: getCookie("username"), message: newMessage, receiver: current },
    ]);
  };

  // Utility function to get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
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
            <strong>{message.sender}: </strong>{message.message}
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
      <MessageBox current={current} onSendMessage={handleSendMessage} />
    </div>
  );
}
