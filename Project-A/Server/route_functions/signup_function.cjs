const signup_function = async (req, res) => {
  const { email, password, username } = req.body;

  console.log(req.body);

  try {
    // Check if user already exists by email or username
    const existingUser = await login_credentials.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
        status: "failed",
      });
    }

    // Create a new user
    const newUser = new login_credentials({
      email,
      password,
      username,
    });

    await newUser.save();

    // Generate new session ID
    const sessionid = crypto.randomBytes(16).toString("hex");

    // Delete any existing sessions for the user
    await active_sessions.deleteOne({ username });

    // Store cookies
    res.cookie("username", username, {
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
      username: username,
      sessionid: sessionid,
    });
    await newSession.save();

    return res.json({
      msg: "SignUp successful",
      status: "approved",
      user: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = signup_function;
