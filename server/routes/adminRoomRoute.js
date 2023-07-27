const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addRoom,
  getAllRooms,
  deleteRoom,
  updateRoom,
  getRoomDetailById,
  getRoomByItsCategoryId,
  getRoomCount,
  getAvailableRoomCount,
  getAllRoomsAdmin,
  getAvailableRooms,
  getSearchedRooms,
} = require("../controllers/adminRoomController");
const adminAuthenticate = require("../middleware/adminAuthenticate");

router
  .post("/addRoom", upload, adminAuthenticate, addRoom)
  .get("/getRoom", getAllRooms)
  .delete("/deleteRoom/:roomId", adminAuthenticate, deleteRoom)
  .patch("/updateRoom/:roomId", upload, adminAuthenticate, updateRoom)
  .get("/getRoomDetailById/:id", getRoomDetailById)
  .get("/getRoomByItsCategoryId", getRoomByItsCategoryId)
  .get("/getRoomCount",adminAuthenticate, getRoomCount)
  .get("/getAvailableRoomCount",adminAuthenticate, getAvailableRoomCount)
  .get("/getAllRoomsAdmin", adminAuthenticate, getAllRoomsAdmin)
  .get("/getAvailableRooms", adminAuthenticate, getAvailableRooms)
  .get("/getSearchedRooms/:noOfAdults/:noOfChildren/:roomCategoryId",getSearchedRooms)
 

module.exports = router;
