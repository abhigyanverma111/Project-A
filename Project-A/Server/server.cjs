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

// route functions
const chatlist_function = require("./route_functions/chatlist_function.cjs");
const messageretrieval_function = require("./route_functions/messageretrieval_function.cjs");
const newchat_function = require("./route_functions/newchat_function.cjs");
const sendmessage_function = require("./route_functions/sendmessage_function.cjs");
const signin_function = require("./route_functions/signin_function.cjs");
const signup_function = require("./route_functions/signup_function.cjs");
// *******

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

app.post("/api/messageretrieval", messageretrieval_function);
app.post("/api/newchat", newchat_function);
app.post("/api/sendmessage", sendmessage_function);
app.post("/api/chatlist", chatlist_function);
app.post("/api/signin", signin_function);
app.post("/api/signup", signup_function);

run();
