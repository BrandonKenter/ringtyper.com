const express = require("express");
const router = express.Router();
const {
  getGlobalLeaderboard,
  updateGlobalLeaderboard,
} = require("../controllers/globalLeaderboardController");

router.get("/getgloballeaderboard", getGlobalLeaderboard);
router.put("/updategloballeaderboard", updateGlobalLeaderboard);

module.exports = router;
