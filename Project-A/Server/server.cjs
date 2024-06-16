const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const LoginCredentials = require("./LoginCredentials.model.cjs");

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
async function placeholder() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
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
  console.log(`email: ${email}`);
  console.log(`password:${password}`);
  try {
    const user = await LoginCredentials.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Username of email not found" });
    }

    if (password != user.password) {
      return res.status(400).json({ msg: "password was incorrect" });
    }
    res.json({
      msg: "siginIn successful",
      user: {
        email: user.email,
        username: user.username,
        password: user.password,
      },
    });
  } catch (error) {
    res.status(500).send("server error");
  }
});

placeholder();
