const { User } = require("../models/user.model");

const admin = async (req, res) => {
  const users = await User.find().select("-password -_id");
  res.status(200).json({ users });
};

module.exports = admin;
