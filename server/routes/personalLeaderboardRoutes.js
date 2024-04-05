const express = require("express");
const router = express.Router();
const {
  getPersonalLeaderboard,
  updatePersonalLeaderboard,
} = require("../controllers/personalLeaderboardController");

router.get("/getpersonalleaderboard/:id", getPersonalLeaderboard);
router.put("/updatepersonalleaderboard", updatePersonalLeaderboard);

module.exports = router;
