import React from "react";

export default function NewChat() {
  const handleNewChat = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://127.0.0.1:4000/api/newchat", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activewith: formData.get("username"), // Assuming activewith is the correct field
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === "approved") {
        console.log("New chat added");
      } else {
        console.error("Message sending failed:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000000", // Black background
    padding: "20px",
    borderRadius: "10px",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #043991", // Blue border
    color: "#FFFFFF", // White text
    backgroundColor: "#031636", // Dark blue background
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#043991", // Bright blue button
    color: "#FFFFFF", // White text
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <h2 style={{ color: "#FFFFFF" }}>New Chat</h2>
      <form onSubmit={handleNewChat}>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Start Chat
        </button>
      </form>
    </div>
  );
}
