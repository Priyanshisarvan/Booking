const roomReserveModel = require("../models/roomReservationModel");
const roomModel = require("../models/adminRoomModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv");

const funcToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decode._id;
};

const addRoomReserve = async (req, res) => {
  const id = req.params.roomId;
  try {
    roomModel.findOne({ _id: id }).then(async (roomId) => {
      if (roomId) {
        const {
          noOfDays,
          noOfAdults,
          noOfChildren,
          checkIn,
          checkOut,
          payment,
        } = req.body;

        let userId = funcToken(req, res);
        let roomReserveInsert = new roomReserveModel({
          userId: userId,
          roomId: roomId,
          noOfDays: noOfDays,
          noOfAdults: noOfAdults,
          noOfChildren: noOfChildren,
          checkIn: checkIn,
          checkOut: checkOut,
          payment: payment,
          status: "Pending",
        });

        await roomReserveInsert.save();
        await roomModel.findByIdAndUpdate(
          { _id: id },
          { $set: { isBooking: true } }
        );
        res.status(201).json({
          message: "Room Booked Successfully",
        });
      } else {
        res.status(201).json({
          message: "This room does not exist...",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllReservedRooms = async (req, res) => {
  try {
    const room = await roomReserveModel
      .find()
      .populate({ path: "userId", strictPopulate: false })
      .populate({
        path: "roomId",
        strictPopulate: false,
        populate: { path: "roomCategoryId" },
      });

    const room1 = room
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      })
      .filter((data) => {
        return data.isStatus === false && data.roomId.isBooking === true;
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

const deleteReserveRooms = async (req, res) => {
  const id = req.params.id;

  try {
    const d1 = await roomReserveModel.findByIdAndUpdate(
      { _id: id },
      { isStatus: true }
    );
    if (d1) {
      await roomModel.findByIdAndUpdate(
        { _id: d1.roomId._id },
        { isBooking: false },
        { new: true }
      );
      res.status(200).json({
        message: "Reserved Room Cancelled Successfully...",
      });
    } else {
      res.status(200).json({
        message: "This booking does not exist...",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Error occurred while cancelling booking...${error}`,
    });
  }
};

const sendApprovalMail = async (name, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const mailOptions = {
      from: "pmsarvan111101@gmail.com",
      to: email,
      subject: "Approval Mail of your recent booking from HOLIDAY INN",
      html:
        "<h3>From Holiday Inn</h3>" +
        "<p>Hello " +
        name +
        ",Your Booking has been approved successfully</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent -", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const id = req.params.roomReserveId;
    const d = await roomReserveModel
      .findByIdAndUpdate(id, { status: req.params.status }, { new: true })
      .populate({ path: "userId", strictPopulate: false });

    if (d) {
      sendApprovalMail(d.userId.firstName, d.userId.email);
      res.status(200).json({
        message: "Booking Status Approved Successfully...",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getBookingDetailByUserId = async (req, res) => {
  try {
    let userId = funcToken(req, res);
    const userData1 = await roomReserveModel
      .find({ userId: { _id: userId }, isStatus: false })
      .populate({ path: "userId" })
      .populate({ path: "roomId", populate: { path: "roomCategoryId" } });

    const userData = userData1.sort((x, y) => {
      return y.createdAt - x.createdAt;
    });
    if (userData) {
      res.status(201).json(userData);
    } else {
      res.status(200).json({
        message: "User does not exists...",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: `Error Occured while getting booking details by its user... ${error}`,
    });
  }
};

const getRoomReserveStatus = async (req, res) => {
  try {
    const roomReserveStatus = await roomReserveModel.aggregate([
      {
        $group: {
          _id: "reserveStatus",
          Pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "Pending"] }, 1, 0],
            },
          },
          Approved: {
            $sum: {
              $cond: [{ $eq: ["$status", "Approved"] }, 1, 0],
            },
          },
          AllBookings: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isStatus", false] },
                    { $eq: ["$checkOutStatus", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);
    res.status(200).send(roomReserveStatus);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getBookingDetailById = async (req, res) => {
  try {
    const room = await roomReserveModel
      .findById(req.params.id)
      .populate({ path: "userId" })
      .populate({ path: "roomId", populate: { path: "roomCategoryId" } });

    if (room) {
      res.status(200).json(room);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookingDetailByItsStatus = async (req, res) => {
  try {
    const bookingDataFound = await roomReserveModel
      .find(req.query)
      .populate({ path: "userId", strictPopulate: false })
      .populate({
        path: "roomId",
        strictPopulate: false,
        populate: { path: "roomCategoryId" },
      });
    const bookingDataFound1 = bookingDataFound
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      })
      .filter((data) => {
        return data.isStatus === false && data.roomId.isBooking === true;
      });

    res.status(200).json(bookingDataFound1);
  } catch (error) {
    res.status(500).json(error);
  }
};

const checkInStatus = async (req, res) => {
  try {
    const id = req.params.id;
    await roomReserveModel.findByIdAndUpdate(
      { _id: id },
      { checkInStatus: true },
      { new: true }
    );
    res.status(200).json({
      message: "User CheckedIn Successfully...",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const checkOutStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      checkOutStatus: true,
      status: " ",
      isBooked: true,
    };
    const d = await roomReserveModel.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    const d1 = await roomModel.findByIdAndUpdate(
      { _id: d.roomId._id },
      { isBooking: false },
      { new: true }
    );
    if (d1) {
      res.status(200).json({
        message: "User CheckedOut Successfully...",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const room = await roomReserveModel
      .find()
      .populate({ path: "userId", strictPopulate: false })
      .populate({
        path: "roomId",
        strictPopulate: false,
        populate: { path: "roomCategoryId" },
      });

    const room1 = room
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      })
      .filter((data) => {
        return data.isStatus === false && data.isBooked === true;
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

const deleteBookedRooms = async (req, res) => {
  const id = req.params.id;

  try {
    const d1 = await roomReserveModel.deleteOne({ _id: id });
    if (d1) {
      res.status(200).json({
        message: "Reserved Room Deleted Successfully...",
      });
    } else {
      res.status(200).json({
        message: "This booking does not exist...",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Error occur while deleting room...${error}`,
    });
  }
};

module.exports = {
  addRoomReserve,
  getAllReservedRooms,
  deleteReserveRooms,
  updateBookingStatus,
  getBookingDetailByUserId,
  getRoomReserveStatus,
  getBookingDetailById,
  getBookingDetailByItsStatus,
  checkInStatus,
  checkOutStatus,
  getBookingDetails,
  deleteBookedRooms,
};
