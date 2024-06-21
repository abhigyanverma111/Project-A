const mongoose = require("mongoose");

const ActiveSessionSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  sessionid: { type: String, required: true },
});

const ActiveSessions = mongoose.model("active_sessions", ActiveSessionSchema);
module.exports = ActiveSessions;
