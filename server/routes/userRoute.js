const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const adminAuthenticate = require("../middleware/adminAuthenticate");

const {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  verifyMail,
  forgotPassword,
  resetPassword,
  deleteUser,
  getUserCount,
  getUserByTokenId,
  updateUser,
} = require("../controllers/userController");

router
  .post("/signUp", registerUser)
  .post("/login", loginUser)
  .get("/getAllUsers", getAllUsers)
  .get("/verify", verifyMail)
  .post("/logout", logoutUser)
  .patch("/deleteUser/:id",adminAuthenticate,deleteUser)
  .post("/forgotPassword",forgotPassword)
  .post("/resetPassword", resetPassword)
  .patch("/updateUser/:id", updateUser)
  .get("/getUserCount",adminAuthenticate,getUserCount)
  .get("/getUserByTokenId", authenticate, getUserByTokenId)

module.exports = router;
