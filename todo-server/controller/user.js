const User = require("../models/users");

module.exports.getuser = async (req, res) => {
  User.findOne({ id: req.user }).then((user) => {
    if (!user) {
      return res
        .status(422)
        .json({ error: "User doesnot exists with that email" });
    } else {
      return res.status(200).json({ user: user });
    }
  });
};
