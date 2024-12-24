const newchat_function = async (req, res) => {
  const { activewith } = req.body;
  const { username, sessionid } = req.cookies;

  if (!username) {
    return res.status(400).json({
      status: "failed",
      message: "Sender not found in cookies",
    });
  }

  try {
    const wantedUser = await login_credentials.findOne({
      username: activewith,
    });
    if (!wantedUser) {
      console.log("Username or email not found");
      return res.status(400).json({
        status: "failed",
        message: "Username or email not found",
      });
    }

    const session = await active_sessions.findOne({ username });
    if (!session) {
      console.log("Session not found");
      return res.status(400).json({
        status: "failed",
        message: "Session error, please login",
      });
    }

    if (session.sessionid === sessionid) {
      const newChat = new active_chats({ username, activewith });
      await newChat.save();
      return res.json({
        status: "approved",
        message: "Chat activated successfully",
      });
    } else {
      console.log("Session ID mismatch");
      return res.status(400).json({
        status: "failed",
        message: "Bad login",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};

module.exports = newchat_function;
