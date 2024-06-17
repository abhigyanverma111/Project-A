const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const login_credentials = require("./LoginCredentials.model.cjs");

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your Vite development server URL
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());
//

const port = 4000;
async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
    // const loginCredentials = await login_credentials.find({});

    // // Log the retrieved documents to the console
    // console.log("Retrieved documents:", loginCredentials);
  } catch (error) {
    console.log("falied to connect to mongodb database :-");
    console.error(error);
  }
}
// routes definition
app.get("/helloworld", (req, res) => {
  res.send("hello world");
});

app.post("/api/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  try {
    const user = await login_credentials.findOne({ email: email });
    if (!user) {
      console.log("Username or email not found");
      return res.status(400).json({
        msg: "Username or email not found",
        status: "failed",
        user: {
          email: user.email,
          username: user.username,
          password: user.password,
        },
      });
    }
    console.log("record found", user);
    if (password == user.password) {
      console.log("record matched!!");
      return res.json({
        msg: "siginIn successful",
        status: "approved",
        user: {
          email: user.email,
          username: user.username,
          password: user.password,
        },
      });
    }
    return res.status(400).json({
      msg: "Incorrect password",
      status: "failed",
    });
  } catch (error) {
    res.status(500).send("server error");
  }
});

run();
