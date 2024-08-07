const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const login_credentials = require("./LoginCredentials.model.cjs");
const active_chats = require("./ActiveChats.model.cjs");
const active_sessions = require("./ActiveSessions.model.cjs");
const messages = require("./Messages.model.cjs");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your Vite development server URL
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

const port = 4000;

async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log("failed to connect to mongodb database :-");
    console.error(error);
  }

  // Uncomment the following if you need to create initial chat data
  // await active_chats.create({
  //   username: "abhigyan",
  //   activewith: "abhay",
  // });
  // await active_chats.create({
  //   username: "abhay",
  //   activewith: "abhigyan",
  // });

  // const activeChats = await active_chats.find({});
  // console.log(activeChats);
}

// Routes definition
app.get("/helloworld", (req, res) => {
  res.send("hello world");
});

app.post("/api/messageretrieval", async (req, res) => {
  const { username, sessionid } = req.cookies;
  const { user2 } = req.body;
  const user1 = username;

  console.log(`Received request to retrieve messages between ${user1} and ${user2}`);

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
});

app.post("/api/newchat", async (req, res) => {
  const { activewith } = req.body;
  const { username, sessionid } = req.cookies;

  if (!username) {
    return res.status(400).json({
      status: "failed",
      message: "Sender not found in cookies",
    });
  }

  try {
    const wantedUser = await login_credentials.findOne({ username: activewith });
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
});

app.post("/api/sendmessage", async (req, res) => {
  const { receiver, message } = req.body;
  const sender = req.cookies.username; // Get the sender from the cookie

  if (!sender) {
    return res.status(400).json({
      status: "failed",
      message: "Sender not found in cookies",
    });
  }

  try {
    const newMessage = new messages({
      sender,
      receiver,
      message,
      time: new Date(),
    });

    await newMessage.save();

    res.json({
      status: "approved",
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
});

app.post("/api/chatlist", async (req, res) => {
  const { username, sessionid } = req.cookies;

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
      console.log("Record matched");

      const chats = await active_chats.find({
        username
      });
      
      return res.json({ status: "approved", chats });
    } else {
      console.log("Session mismatch");
      return res.status(400).json({
        msg: "Bad login",
        status: "failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/api/signin", async (req, res) => {
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
});

app.post("/api/signup", async (req, res) => {
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
});

run();
