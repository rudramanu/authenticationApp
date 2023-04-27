const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  url: String,
  name: String,
  bio: String,
  phone: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
