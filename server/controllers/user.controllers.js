const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const myFirstSecret = process.env.FIRST_SECRET_KEY;
module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      res
        .cookie("usertoken", userToken, {
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => res.json(err));
};

module.exports.loginUsers = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    return res.sendStatus(400);
  }
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!correctPassword) {
    return res.sendStatus(400);
  }
  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );
  res
    .cookie("usertoken", userToken, {
      httpOnly: true,
    })
    .json({ msg: "success!" });
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
};

module.exports.getAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch((err) => console.log(err));
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deleteConfirm) => res.json(deleteConfirm))
    .catch((err) => console.log(err));
};

module.exports.UpdateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((allUsers) => res.json(allUsers))
    .catch((err) => console.log(err));
};
module.exports.getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then((allUsers) => res.json(allUsers))
    .catch((err) => console.log(err));
};

const payload = {
  id: User._id,
};

const userToken = jwt.sign(payload, process.env.SECRET_KEY);
