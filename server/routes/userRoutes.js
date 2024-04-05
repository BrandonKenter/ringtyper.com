const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  signOut,
  getUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/getuser/:token", getUser);
router.patch("/updateuser", updateUser);

module.exports = router;
