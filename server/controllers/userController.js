const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { getDateUTC } = require("../DateTimeUtils");

const maxTokenAge = 3 * 24 * 60 * 60;
const defaultSettings = {
  general: {
    volume: 50,
    focus: false,
    quickReset: "enter",
    showErrors: true,
    perfectionMode: false,
  },
  games: {
    classic: {
      maximumTime: 0,
    },
    reverse: {
      maximumTime: 0,
    },
    shuffle: {
      maximumTime: 0,
    },
    unlimited: {
      maximumTime: 30,
    },
  },
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxTokenAge,
  });
};

const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const currentDateUTC = getDateUTC(new Date());
  let errors = [];

  try {
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      errors.push("Username already exists");
    }

    if (existingEmail) {
      errors.push("Email already exists");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.create({
      joined: currentDateUTC,
      username,
      email,
      password,
      settings: defaultSettings,
    });
    const token = createToken(user._id);

    res.status(200).json({
      _id: user.id,
      joined: user.jooined,
      username: user.username,
      email: user.email,
      token: token,
      settings: defaultSettings,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "There was an issue signing up", error: err });
  }
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      _id: user.id,
      joined: user.joined,
      username: user.username,
      email: user.email,
      settings: user.settings,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "There was an issue signing in", error: err });
  }
});

const signOut = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Signed out successfully" });
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(200).json({ _id: null });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.status(200).json(user || { _id: null });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "There was an issue getting the user", error: err });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { user } = req.body;
    const existingUser = await User.findById(user._id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "There was an issue updating the user", error: err });
  }
});

module.exports = {
  signUp,
  signIn,
  signOut,
  getUser,
  updateUser,
};
