import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";
import "./../public/ChatPage.css";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);

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

    const newInterval = setInterval(fetchChatList, 10000);

    return () => {
      clearInterval(newInterval);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-page">
      <ChatList chats={chats} setCurrentChat={setCurrentChat} />
      <MessageWindow current={currentChat} />
    </div>
  );
}

export default ChatPage;
