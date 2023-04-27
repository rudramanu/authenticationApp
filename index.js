const express = require("express");
const { connection } = require("./configs/db");

const cors = require("cors");
const { userRouter } = require("./routes/user.route");
require("dotenv").config();

const app = express();
app.use(cors());
//======cors is present here
app.use(express.json());
app.get("/", (req, res) => {
  res.send("new getting");
});
app.use("/users", userRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Some problem while connecting to Database", error);
  }
  console.log(`running at port ${process.env.port}`);
});
