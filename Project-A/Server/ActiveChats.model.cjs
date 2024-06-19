const mongoose = require("mongoose");

const ActiveChatSchema = mongoose.Schema({
  username: { type: String, required: true },
  activewith: { type: String, requird: true },
});

const ActiveChats = mongoose.model("active_chats", ActiveChatSchema);
module.exports = ActiveChats;
