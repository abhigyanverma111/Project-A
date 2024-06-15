const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 4000;
async function placeholder() {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.3"
    );
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log("falied to connect to mongodb database :-");
    console.error(error);
  }
}

app.get("/helloworld", (req, res) => {
  res.send("hello world");
});

placeholder();
