const userContactModel = require("../models/userContactModal");
const validator = require("validator");

const addUserContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json("All fields are required...");
    }
    if (!validator.isAlpha(name)) {
      return res.status(400).json("Name must be characters");
    }
    if (!validator.isInt(phone)) {
      return res.status(400).json("Phone Number must be Numbers");
    }
    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json("phone Number length must be 10");
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json("Email is not Valid");
    }

    const newUser = await userContactModel.create({
      name,
      phone,
      email,
      message,
    });
    if (newUser) {
      res.status(201).json({
        message: "Your Response Registered Successfully....",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
const getAllUsersContact = async (req, res, next) => {
  try {
    const user = await userContactModel.find().populate({ path: "userId" });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteUserContact = async (req, res) => {
  const id = req.params.id;

  try {
    userContactModel.findOne({ _id: id }).then(async (userId) => {
      if (userId) {
        const userInfo = await userContactModel.deleteOne({ _id: id });
        if (userInfo) {
          res.status(200).json({
            message: "User Contact Deleted successfully...",
          });
        }
      } else {
        res.status(400).json({
          message: "This user does not exist...",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: `Error occur while deleting user contact...${error}`,
    });
  }
};

const getUserContactDetailById = async (req, res) => {
  try {
    const user = await userContactModel
      .findById(req.params.id)
      .populate({ path: "userId" });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const userContactStatusUpdate = async (req, res) => {
  const id = req.params.id;
  try {
    await userContactModel.findByIdAndUpdate(
      id,
      { status: "Read" },
      { new: true }
    );

    res.status(200).json({
      message: "Contact Status Updated Successfully...",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  addUserContact,
  getAllUsersContact,
  deleteUserContact,
  getUserContactDetailById,
  userContactStatusUpdate,
};
