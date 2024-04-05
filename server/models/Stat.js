const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  id: String,
  classic: {
    gamesPlayed: Number,
    errors: Number,
    cumulativeTime: Number,
    bestTime: Number,
    missedChars: {
      a: Number,
      b: Number,
      c: Number,
      d: Number,
      e: Number,
      f: Number,
      g: Number,
      h: Number,
      i: Number,
      j: Number,
      k: Number,
      l: Number,
      m: Number,
      n: Number,
      o: Number,
      p: Number,
      q: Number,
      r: Number,
      s: Number,
      t: Number,
      u: Number,
      v: Number,
      w: Number,
      x: Number,
      y: Number,
      z: Number,
    },
  },
  reverse: {
    gamesPlayed: Number,
    errors: Number,
    cumulativeTime: Number,
    bestTime: Number,
    missedChars: {
      a: Number,
      b: Number,
      c: Number,
      d: Number,
      e: Number,
      f: Number,
      g: Number,
      h: Number,
      i: Number,
      j: Number,
      k: Number,
      l: Number,
      m: Number,
      n: Number,
      o: Number,
      p: Number,
      q: Number,
      r: Number,
      s: Number,
      t: Number,
      u: Number,
      v: Number,
      w: Number,
      x: Number,
      y: Number,
      z: Number,
    },
  },
  shuffle: {
    gamesPlayed: Number,
    errors: Number,
    cumulativeTime: Number,
    bestTime: Number,
    missedChars: {
      a: Number,
      b: Number,
      c: Number,
      d: Number,
      e: Number,
      f: Number,
      g: Number,
      h: Number,
      i: Number,
      j: Number,
      k: Number,
      l: Number,
      m: Number,
      n: Number,
      o: Number,
      p: Number,
      q: Number,
      r: Number,
      s: Number,
      t: Number,
      u: Number,
      v: Number,
      w: Number,
      x: Number,
      y: Number,
      z: Number,
    },
  },
  unlimited: {
    gamesPlayed: Number,
    errors: Number,
    cumulativeCharacters: Number,
    bestCharacters: Number,
    missedChars: {
      a: Number,
      b: Number,
      c: Number,
      d: Number,
      e: Number,
      f: Number,
      g: Number,
      h: Number,
      i: Number,
      j: Number,
      k: Number,
      l: Number,
      m: Number,
      n: Number,
      o: Number,
      p: Number,
      q: Number,
      r: Number,
      s: Number,
      t: Number,
      u: Number,
      v: Number,
      w: Number,
      x: Number,
      y: Number,
      z: Number,
    },
  },
});

module.exports = Stat = mongoose.model("Stat", statSchema);
