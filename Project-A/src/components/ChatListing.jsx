import { useState } from "react";

export default function ChatListing({ chat, setCurrentChat }) {
  const [mouseHover, setHover] = useState(false);

  const setBackgroundColor = (mouseHover) => {
    if (mouseHover) {
      return "#043991";
    } else {
      return "#031636";
    }
  };

  return (
    <div
      // onclick function
      onClick={() => {
        setCurrentChat(chat.activewith);
      }}
      // this will set current chat (hopefully)
      style={{
        width: "98%",
        height: "auto",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: setBackgroundColor(mouseHover),
        margin: "3px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 style={{ color: "#b8b7b6" }}>{chat.activewith}</h3>
      <p style={{ color: "#707070" }}>chat preview</p>
    </div>
  );
}
