const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const login_credentials = require("./LoginCredentials.model.cjs");
const active_chats = require("./ActiveChats.model.cjs");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your Vite development server URL
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());

const port = 4000;

async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log("failed to connect to mongodb database :-");
    console.error(error);
  }

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

app.post("/api/signup", async (req, res) => {});

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
    console.log("record found", user);

    // Compare the provided password with the stored password (plaintext)
    if (password === user.password) {
      console.log("record matched!!");
      return res.json({
        msg: "signIn successful",
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
    res.status(500).send("server error");
  }
});

app.post("/api/signup", async (req, res) => {
  const { email, password, username } = req.body;

  console.log(req.body);

  try {
    // Check if user already exists by email or username
    const existingUser = await login_credentials.findOne({
      $or: [{ email: email }, { username: username }],
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
      password, // Store the password in plaintext (not recommended)
      username,
    });

    await newUser.save();
    res.json({
      msg: "SignUp successful",
      status: "approved",
      user: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

run();
