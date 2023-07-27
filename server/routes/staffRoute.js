const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const adminAuthenticate = require("../middleware/adminAuthenticate");

const {
  addStaff,
  getAllStaff,
  deleteStaff,
  updateStaff,
  getStaffCount,
  getStaffById,
} = require("../controllers/staffController");

router
  .post("/addStaff", upload, adminAuthenticate, addStaff)
  .get("/getAllStaff", getAllStaff)
  .delete("/deleteStaff/:staffId", adminAuthenticate, deleteStaff)
  .patch("/updateStaff/:staffId", upload, adminAuthenticate, updateStaff)
  .get("/getStaffCount", adminAuthenticate,getStaffCount)
  .get("/getStaffById/:staffId", adminAuthenticate, getStaffById);

module.exports = router;

