const asyncHandler = require("express-async-handler");
const Personal = require("../models/Personal");
const { getDateUTC } = require("../DateTimeUtils");

const getPersonalLeaderboard = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const date = getDateUTC(new Date());

  try {
    const personalLeaderboardData = await Personal.findOne({ id, date });
    res.json(personalLeaderboardData);
  } catch (err) {
    res.status(500).json({
      message: "There was an error getting the personal leaderobard",
      error: err,
    });
  }
});

const updatePersonalLeaderboard = asyncHandler(async (req, res) => {
  const { id, date, newPersonalLeaderboard, game } = req.body;

  try {
    const personalLeaderboardData = await Personal.findOne({ id, date });

    if (personalLeaderboardData) {
      personalLeaderboardData[game] = newPersonalLeaderboard;
      await personalLeaderboardData.save();
      res.status(200).json(personalLeaderboardData);
    } else {
      const newEntry = new Personal({
        id: id,
        date: date,
        classic: game === "classic" ? newPersonalLeaderboard : [],
        reverse: game === "reverse" ? newPersonalLeaderboard : [],
        shuffle: game === "shuffle" ? newPersonalLeaderboard : [],
        unlimited: game === "unlimited" ? newPersonalLeaderboard : [],
      });

      const savedEntry = await newEntry.save();
      res.status(201).json(savedEntry);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error getting the global leaderboard",
      error: err,
    });
  }
});

module.exports = {
  getPersonalLeaderboard,
  updatePersonalLeaderboard,
};
