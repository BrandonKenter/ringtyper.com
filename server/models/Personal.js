const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema({
  id: String,
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

module.exports = Personal = mongoose.model("Personal", personalSchema);
