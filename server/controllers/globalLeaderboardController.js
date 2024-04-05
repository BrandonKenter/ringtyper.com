const asyncHandler = require("express-async-handler");
const Global = require("../models/Global");
const { getDateUTC } = require("../DateTimeUtils");

const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  const date = getDateUTC(new Date());

  try {
    const globalLeaderboardData = await Global.findOne({ date });
    res.json(globalLeaderboardData);
  } catch (err) {
    res.status(500).json({
      message: "There was an error getting the global leaderboard",
      error: err,
    });
  }
});

const updateGlobalLeaderboard = asyncHandler(async (req, res) => {
  const { date, newGlobalLeaderboard, game } = req.body;

  try {
    const globalLeaderboardData = await Global.findOne({ date });

    if (globalLeaderboardData) {
      globalLeaderboardData[game] = newGlobalLeaderboard;
      await globalLeaderboardData.save();
      res.status(200).json(globalLeaderboardData);
    } else {
      const newEntry = new Global({
        date: date,
        classic: game === "classic" ? newGlobalLeaderboard : [],
        reverse: game === "reverse" ? newGlobalLeaderboard : [],
        shuffle: game === "shuffle" ? newGlobalLeaderboard : [],
        unlimited: game === "unlimited" ? newGlobalLeaderboard : [],
      });

      const savedEntry = await newEntry.save();
      res.status(200).json(savedEntry);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error updating the global leaderboard",
      error: err,
    });
  }
});

module.exports = {
  getGlobalLeaderboard,
  updateGlobalLeaderboard,
};
