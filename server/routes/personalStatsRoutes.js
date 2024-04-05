const express = require("express");
const router = express.Router();
const {
  getPersonalStats,
  updatePersonalStats,
} = require("../controllers/personalStatsController");

router.get("/getpersonalstats/:id", getPersonalStats);
router.put("/updatepersonalstats", updatePersonalStats);

module.exports = router;
