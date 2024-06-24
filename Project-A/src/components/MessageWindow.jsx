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
  useEffect(() => {
    const messageReaload = setInterval(async () => {
      // message load code
    }, 10000);

    return () => {
      clearInterval(messageReaload);
    };
  }, [currentChat]);
}
