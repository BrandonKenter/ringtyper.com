const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  joined: Date,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  settings: {
    general: {
      volume: Number,
      focus: Boolean,
      quickReset: String,
      showErrors: Boolean,
      perfectionMode: Boolean,
    },
    games: {
      classic: {
        maximumTime: Number,
      },
      reverse: {
        maximumTime: Number,
      },
      shuffle: {
        maximumTime: Number,
      },
      unlimited: {
        maximumTime: Number,
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  }
  throw Error("Incorrect email");
};

module.exports = User = mongoose.model("User", userSchema);
