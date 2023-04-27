const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  token: String,
});
const BlacklistModel = mongoose.model("token", blacklistSchema);
module.exports = {
  BlacklistModel,
};
