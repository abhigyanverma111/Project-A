const signin_function = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  console.log(req.body);

  try {
    // Find user by email or username
    const user = await login_credentials.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      console.log("Username or email not found");
      return res.status(400).json({
        msg: "Username or email not found",
        status: "failed",
      });
    }

    // Compare the provided password with the stored password (plaintext)
    if (password === user.password) {
      console.log("Record matched!");

      // Generate new session ID
      const sessionid = crypto.randomBytes(16).toString("hex");

      // Delete any existing sessions for the user
      await active_sessions.deleteOne({ username: user.username });

      // Store cookies to overwrite any previous cookies
      res.cookie("username", user.username, {
        path: "/api",
        sameSite: "none",
        secure: true,
      });
      res.cookie("sessionid", sessionid, {
        path: "/api",
        sameSite: "none",
        secure: true,
      });

      // Save the new session
      const newSession = new active_sessions({
        username: user.username,
        sessionid: sessionid,
      });
      await newSession.save();

      return res.json({
        msg: "SignIn successful",
        status: "approved",
        user: {
          email: user.email,
          username: user.username,
        },
      });
    } else {
      return res.status(400).json({
        msg: "Incorrect password",
        status: "failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = signin_function;
