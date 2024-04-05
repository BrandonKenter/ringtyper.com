const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  date: Date,
  classic: {
    type: [
      {
        user: String,
        time: Number,
        errors: Number,
        accuracy: Number,
        date: Date,
      },
    ],
  },
  reverse: {
    type: [
      {
        user: String,
        time: Number,
        errors: Number,
        accuracy: Number,
        date: Date,
      },
    ],
  },
  shuffle: {
    type: [
      {
        user: String,
        time: Number,
        errors: Number,
        accuracy: Number,
        date: Date,
      },
    ],
  },
  unlimited: {
    type: [
      {
        user: String,
        characters: Number,
        errors: Number,
        accuracy: Number,
        date: Date,
      },
    ],
  },
});

module.exports = Global = mongoose.model("Global", globalSchema);
