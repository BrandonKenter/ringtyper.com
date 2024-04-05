const asyncHandler = require("express-async-handler");
const Stat = require("../models/Stat");

const getPersonalStats = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const personalStatsData = await Stat.findOne({ id });
    res.status(200).json(personalStatsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "There was an issue getting global leaderboard",
      error: err,
    });
  }
});

const updatePersonalStats = asyncHandler(async (req, res) => {
  const { id, newPersonalStats } = req.body;

  try {
    const personalStatsData = await Stat.findOne({ id });

    if (personalStatsData) {
      personalStatsData.classic = newPersonalStats.classic;
      personalStatsData.reverse = newPersonalStats.reverse;
      personalStatsData.shuffle = newPersonalStats.shuffl;
      personalStatsData.unlimited = newPersonalStats.unlimited;
      await personalStatsData.save();
      res.status(200).json(personalStatsData);
    } else {
      const newEntry = new Stat({
        id: id,
        classic: newPersonalStats.classic ? newPersonalStats.classic : [],
        reverse: newPersonalStats.reverse ? newPersonalStats.reverse : [],
        shuffle: newPersonalStats.shuffle ? newPersonalStats.shuffle : [],
        unlimited: newPersonalStats.unlimited ? newPersonalStats.unlimited : [],
      });
      const savedEntry = await newEntry.save();
      res.status(200).json(savedEntry);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "There was an issue getting global leaderboard",
      error: err,
    });
  }
});

module.exports = {
  getPersonalStats,
  updatePersonalStats,
};
