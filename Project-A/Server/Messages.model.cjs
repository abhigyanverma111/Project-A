const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, requird: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

MessageSchema.index({ sender: 1, receiver: 1, time: 1 });

const Messages = mongoose.model("messages", MessageSchema);
module.exports = Messages;
