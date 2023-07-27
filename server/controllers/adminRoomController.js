const roomModel = require("../models/adminRoomModel");
const cloudinary = require("../utils/cloudinary");
const validator = require("validator");


const addRoom = async (req, res) => {
  try {
    const {
      roomCategoryId,
      roomType,
      price,
      noOfAdults,
      noOfChildren,
      description,
    } = req.body;

    if (
      !roomCategoryId ||
      !roomType ||
      !price ||
      !noOfAdults ||
      !noOfChildren ||
      !description
    ) {
      res.status(400).json("All fields are required..");
    }
    if (!validator.isInt(price)) {
      res.status(400).json("Price must be Numbers");
    }
    const result = await cloudinary.uploader.upload(req.files[0].path, {
      folder: "roomsImage",
      use_filename: true,
      unique_filename: false,
    });

    let roomInsert = new roomModel({
      roomCategoryId,
      roomType,
      price,
      noOfAdults,
      noOfChildren,
      description,
      cloudinaryId: result.public_id,
      url: result.url,
    });

    await roomInsert.save();

    res.status(201).json({
      message: "Room Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllRooms = async (req, res) => {
  try {
    const room = await roomModel.find().populate({ path: "roomCategoryId" });
    const room1 = room
      .filter((data) => {
        return (
          data.roomCategoryId.isStatus === false &&
          data.isBooking === false &&
          data.isStatus === false
        );
      })
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      });

    if (room) {
      res.status(200).send(room);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRoom = async (req, res) => {
  const id = req.params.roomId;

  try {
    const data = await roomModel.findOne({ _id: id });
    if (data.isBooking) {
      return res.json({
        message: "You cannot delete this room because it is booked already",
      });
    } else {
      const roomInfo = await roomModel.updateOne(
        { _id: id },
        { $set: { isStatus: true } }
      );
      if (roomInfo) {
        res.status(201).json({
          message: "Room Deleted Successfully...",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: `Error occur while deleting room...${error}`,
    });
  }
};

const updateRoom = async (req, res) => {
  const id = req.params.roomId;

  const {
    roomCategoryId,
    roomType,
    price,
    noOfAdults,
    noOfChildren,
    description,
  } = req.body;

  if (
    !roomCategoryId ||
    !roomType ||
    !price ||
    !noOfAdults ||
    !noOfChildren ||
    !description
  ) {
    return res.status(400).json("All fields are required..");
  }
  if (!validator.isInt(price)) {
    return res.status(400).json("Price must be Numbers");
  }


  roomModel.findOne({ _id: id }).then(async (roomId) => {
    if (roomId) {
      const updatedata = {
        roomCategoryId,
        roomType,
        price,
        noOfAdults,
        noOfChildren,    
        description,
      };

      const roomInfo = await roomModel.updateOne(
        { _id: id },
        { $set: updatedata }
      );

      if (roomInfo) {
        res.status(201).json({
          message: "Room Updated Successfully...",
        });
      }
    } else {
      res.status(400).json({
        message: "This Room does not exist...",
      });
    }
  });
};

const getRoomDetailById = async (req, res) => {
  try {
    const room = await roomModel
      .findById(req.params.id.trim())
      .populate({ path: "roomCategoryId" });

    if (room) {
      res.status(200).json(room);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getRoomByItsCategoryId = async (req, res) => {
  try {
    const roomDataFound = await roomModel
      .find(req.query)
      .populate({ path: "roomCategoryId" });
    const roomDataFound1 = roomDataFound.filter((data) => {
      return (
        data.roomCategoryId.isStatus === false &&
        data.isBooking === false &&
        data.isStatus === false
      );
    });
    res.status(200).json(roomDataFound1);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: `Error Occured while getting room by its type... ${error}`,
    });
  }
};

const getRoomCount = async (req, res) => {
  try {
    const room = await roomModel.find().populate({ path: "roomCategoryId" });
    const room1 = room
      .filter((data) => {
        return (
          data.roomCategoryId.isStatus === false && data.isStatus === false
        );
      })
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      }).length;

    res.status(200).json({ totalRooms: room1 });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAvailableRooms = async (req, res) => {
  try {
    const room = await roomModel.find().populate({ path: "roomCategoryId" });

    const roomData = room
      .filter((data) => {
        return (
          data.roomCategoryId.isStatus === false &&
          data.isStatus === false &&
          data.isBooking === false
        );
      })
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      });

    res.status(200).send(roomData);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAvailableRoomCount = async (req, res) => {
  try {
    const room = await roomModel.find().populate({ path: "roomCategoryId" });
    const availableRoomCount = room
      .filter((data) => {
        return (
          data.roomCategoryId.isStatus === false &&
          data.isStatus === false &&
          data.isBooking === false
        );
      })
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      }).length;

    res.status(200).json(availableRoomCount);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllRoomsAdmin = async(req, res) => {
  try {
    const room = await roomModel.find().populate({ path: "roomCategoryId" });
    const room1 = room
      .filter((data) => {
        return (
          data.roomCategoryId.isStatus === false &&
          data.isStatus === false &&
          data.isBooking === false
        );
      })
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      });

    if (room1) {
      res.status(200).send(room1);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSearchedRooms = async (req, res) => {
  try {
    const room = await roomModel
      .find({
        noOfAdults: req.params.noOfAdults,
        noOfChildren: req.params.noOfChildren,
        roomCategoryId: { _id: req.params.roomCategoryId },
      })
      .populate({ path: "roomCategoryId" });

    if (room) {
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addRoom,
  getAllRooms,
  deleteRoom,
  updateRoom,
  getRoomDetailById,
  getRoomByItsCategoryId,
  getRoomCount,
  getAvailableRooms,
  getAvailableRoomCount,
  getAllRoomsAdmin,
  getSearchedRooms,

};
