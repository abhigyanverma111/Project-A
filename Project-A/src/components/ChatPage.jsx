import ChatList from "./ChatList";

async function ChatPage() {
  // fetching chat-list from node server
  let response = await fetch("http://127.0.0.1:4000/api/chatlist", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  let retrievedChats = await response.json();
  console.log(retrievedChats.chats);

  return (
    <div style={{ backgroundColor: "#010917" }}>
      <ChatList chats={retrievedChats.chats} />
    </div>
  );
}

export default ChatPage;
