import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/api/chatlist", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();
        console.log("API Response:", data); // Log the response to check the structure
        if (data.status === "approved") {
          setChats(data.chats);
        } else {
          console.error("Failed to retrieve chats", data.msg);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#010917" }}>
      <ChatList chats={chats} />
    </div>
  );
}

export default ChatPage;
