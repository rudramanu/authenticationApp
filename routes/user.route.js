const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");
const { authenticate } = require("../middleware/authentication");
userRouter.post("/register", (req, res) => {
  const { url, name, bio, phone, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, encrypted_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          url,
          name,
          bio,
          phone,
          email,
          password: encrypted_pass,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send("Error while registering", error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const hashed_pass = user?.password;
    bcrypt.compare(password, hashed_pass, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, "rudra");
        res.send({ message: "Logged in successfully", token });
      } else {
        res.send("Wrong credentials", err);
      }
    });
  } catch (error) {
    res.send("Error", error);
  }
});

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization;
  const addtoken = new BlacklistModel({ token });
  await addtoken.save();
  res.send("Logged out successfully");
});

userRouter.get("/getdetails", authenticate, async (req, res) => {
  const detail = await UserModel.find();
  res.send(detail[0]);
});

userRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("User details updated");
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
});

module.exports = { userRouter };
