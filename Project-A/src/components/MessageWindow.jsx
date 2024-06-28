import React, { useState, useEffect } from "react";

export default function MessageWindow({ currentChat }) {
  if (currentChat == null) {
    return (
      <div
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
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messageReaload = setInterval(async () => {
      const response = await fetch(
        "http://127.0.0.1:4000/api/messageretrieval",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user2: currentChat,
          }),
        }
      );
      const data = await response.json();
      setMessageArray(data.messageArray);
      setLoading(false);
    }, 10000);

    return () => {
      clearInterval(messageReaload);
    };
  }, [currentChat]);
  if (loading) {
    return (
      <div
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Sample Message Window
    </div>
  );
}
