const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./config/db");
const app = express();

const userRoutes = require("./routes/userRoutes");
const personalLeaderboardRoutes = require("./routes/personalLeaderboardRoutes");
const globalLeaderboardRoutes = require("./routes/globalLeaderboardRoutes");
const personalStatsRoutes = require("./routes/personalStatsRoutes");

connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://www.ringtyper.com" }));
app.use("/api/users", userRoutes);
app.use("/api/personalleaderboards", personalLeaderboardRoutes);
app.use("/api/globalleaderboards", globalLeaderboardRoutes);
app.use("/api/personalstats", personalStatsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
