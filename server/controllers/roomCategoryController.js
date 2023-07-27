const roomCategoryModel = require("../models/roomCategory");

const addRoomCategory = async (req, res) => {
  try {
    const { roomCategory } = req.body;
    if (!roomCategory) {
      res.json("All fields are required ...");
    }
    if (roomCategory.length < 3) {
      res.json("This Room Category length atleast 3...");
    }
    await roomCategoryModel
      .findOne({ roomCategory: roomCategory })
      .then(async (roomCatId) => {
        if (roomCatId) {
          res.json("This Room Category already exist...");
        } else {
          let roomCatInsert = new roomCategoryModel({
            roomCategory,
          });

          await roomCatInsert.save();

          return res
            .status(201)
            .json({ message: "Room Category Added Successfully" });
        }
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllRoomCategory = async (req, res, next) => {
  try {
    const roomCategory = await roomCategoryModel.find({ isStatus: false });

    if (roomCategory) {
      res.status(200).send(roomCategory);
    } else {
      res.status(200).json("No Data Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRoomCategory = async (req, res) => {
  const { id } = req.params;

  try {
    roomCategoryModel.findOne({ _id: id }).then(async (roomCatId) => {
      if (roomCatId) {
        await roomCategoryModel
          .updateOne({ _id: id }, { $set: { isStatus: true } })
          .then(() => {
            res
              .status(201)
              .json({ message: "Room Category Deleted successfully..." });
          });
      } else {
        res
          .status(201)
          .json({ message: "This room category does not exist..." });
      }
    });
  } catch (error) {
    res.status(500).json("Error occur while deleting room...${error}");
  }
};

const updateRoomCategory = async (req, res, next) => {
  const id = req.params.id;
  const { roomCategory } = req.body;
  try {
    await roomCategoryModel.findOne({ _id: id }).then(async (roomId) => {
      if (roomId) {
        const updatedata = {
          roomCategory,
        };
        const data = await roomCategoryModel.updateOne(
          { _id: id },
          { $set: updatedata }
        );
        if (data) {
          res
            .status(200)
            .json({ message: "Room Catgeory Updated Successfully..." });
        }
      } else {
        res
          .status(500)
          .json({ message: "This Room Catgeory does not exist..." });
      }
    });
  } catch (error) {
    res.status(500).json("Error occur while deleting room...${error}");
  }
};

const getDataById = async (req, res) => {
  try {
    const roomCategory = await roomCategoryModel.findById(req.params.id);

    if (roomCategory) {
      res.status(200).json(roomCategory);
    } else {
      res.status(200).json("No Data Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addRoomCategory,
  deleteRoomCategory,
  getAllRoomCategory,
  updateRoomCategory,
  getDataById,
};
      