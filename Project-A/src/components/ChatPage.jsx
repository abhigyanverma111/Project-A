import ChatList from "./ChatList";

function ChatPage() {
  let chats = [
    { id: 1, name: "Conn" },
    { id: 2, name: "Cherie" },
    { id: 3, name: "Roma" },
    { id: 4, name: "Paulita" },
    { id: 5, name: "Birgit" },
    { id: 6, name: "Faulkner" },
    { id: 7, name: "Gunther" },
    { id: 8, name: "Nadiya" },
    { id: 9, name: "Dukie" },
    { id: 10, name: "Wesley" },
  ];

  return (
    <div style={{ backgroundColor: "#010917" }}>
      <ChatList chats={chats} />
    </div>
  );
}

export default ChatPage;
