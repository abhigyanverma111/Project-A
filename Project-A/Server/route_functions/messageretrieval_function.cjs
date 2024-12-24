const messageretrieval_function = async (req, res) => {
  const { username, sessionid } = req.cookies;
  const { user2 } = req.body;
  const user1 = username;

  console.log(
    `Received request to retrieve messages between ${user1} and ${user2}`
  );

  try {
    const user = await login_credentials.findOne({ username });
    if (!user) {
      console.log("Username or email not found");
      return res.status(400).json({
        msg: "Username or email not found",
        status: "failed",
      });
    }

    const session = await active_sessions.findOne({ username });
    if (!session) {
      console.log("Session not found");
      return res.status(400).json({
        msg: "Session error, please login",
        status: "failed",
      });
    }

    if (session.sessionid === sessionid) {
      console.log("Record matched. Fetching messages...");

      const messageArray = await messages
        .find({
          $or: [
            { sender: user1, receiver: user2 },
            { sender: user2, receiver: user1 },
          ],
        })
        .sort({ time: 1 });

      console.log("Retrieved messages:", messageArray);

      return res.json({ status: "approved", messageArray });
    } else {
      console.log("Session mismatch");
      return res.status(400).json({
        msg: "Bad login",
        status: "failed",
      });
    }
  } catch (error) {
    console.error("Error during message retrieval:", error);
    res.status(500).send("Server error");
  }
};

module.exports = messageretrieval_function;
