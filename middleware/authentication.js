const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const blacklisted = await BlacklistModel.find();
    blacklisted.forEach((el) => {
      if (el.token == token) {
        res.send("Your session has been expired, please login again");
      }
    });
    const decoded = jwt.verify(token, "rudra");
    if (decoded) {
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please login first");
  }
};

module.exports = { authenticate };
