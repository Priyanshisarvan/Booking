const express = require("express");
const {
  addRoomCategory,
  getAllRoomCategory,
  deleteRoomCategory,
  updateRoomCategory,
  getDataById,
} = require("../controllers/roomCategoryController");
const router = express.Router();
const adminAuthenticate = require("../middleware/adminAuthenticate");

router
  .post("/addRoomCategory", adminAuthenticate, addRoomCategory)
  .get("/getAllRoomCategory", getAllRoomCategory)
  .delete("/deleteRoomCategory/:id", adminAuthenticate, deleteRoomCategory)
  .patch("/updateRoomCategory/:id", adminAuthenticate, updateRoomCategory)
  .get("/getDataById/:id", getDataById);

module.exports = router;
