import React, { useState, useEffect } from "react";
import "./../public/MessageWindow.css"
export default function MessageWindow({ current }) {
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (current == null) {
      setMessageArray([]);
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      try {
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

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [current]);

  if (loading) {
    return (
      <div
        id="containing"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (current == null) {
    return (
      <div
        id="containing"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Click on a user to view/send messages
      </div>
    );
  }

  return (
    <div
      id="containing"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {messageArray.length > 0 ? (
        messageArray.map((message, index) => <div key={index}>{message}</div>)
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
}
