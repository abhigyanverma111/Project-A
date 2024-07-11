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

  return (
    <div>
      <h2>New Chat</h2>
      <form onSubmit={handleNewChat}>
        <input type="text" placeholder="username" name="username" />
        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
}
