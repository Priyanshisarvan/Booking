const feedbackModel = require("../models/feedbackModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const funcToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decode._id;
};

//add feedback

const addFeedback = async (req, res) => {
  try {
    const userId = funcToken(req, res);
    const { comments, ratings } = req.body;

    if (ratings > 5) {
      return res.status(400).json({
        message: "Please enter ratings upto 5 only...",
      });
    }
    let feedbackInsert = new feedbackModel({
      userId: userId,
      comments: comments,
      ratings: ratings,
    });

    feedbackInsert.save();

    res.status(201).json({
      message: "Feedback has been sent successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

//get all feedbacks

const getAllFeedbacks = async (req, res, next) => {
  try {
    const feedback = await feedbackModel.find().populate({ path: "userId" });

    if (feedback) {
      res.status(200).send(feedback);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete Feedback

const deleteFeedback = async (req, res) => {
  const id = req.params.feedbackId;

  try {
    feedbackModel.findOne({ _id: id }).then(async (feedbackId) => {
      if (feedbackId) {
        const feedbackInfo = await feedbackModel.deleteOne({ _id: id });
        if (feedbackInfo) {
          res.status(200).json({
            message: "Feedback Deleted Successfully...",
          });
        }
      } else {
        res.status(200).json({
          message: "Feedback does not exist...",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: `Error occur while deleting feedback...${error}`,
    });
  }
};

//update feedback

const updateFeedback = async (req, res, next) => {
  const id = req.params.feedbackId;

  const { comments, ratings } = req.body;

  feedbackModel.findOne({ _id: id }).then(async (feedbackId) => {
    if (feedbackId) {
      const updatedata = {
        comments: comments,
        ratings: ratings,
      };
      const feedbackInfo = await feedbackModel.updateOne(
        { _id: id },
        { $set: updatedata }
      );

      if (feedbackInfo) {
        res.status(200).json({
          message: "Feedback Updated Successfully...",
        });
      }
    } else {
      res.status(200).json({
        message: "The Feedback does not exist...",
      });
    }
  });
};

//get feedback By Id

const getFeedbackById = async (req, res) => {
  try {
    const feedback = await feedbackModel
      .findById(req.params.id)
      .populate({ path: "userId" });

    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  addFeedback,
  getAllFeedbacks,
  deleteFeedback,
  updateFeedback,
  getFeedbackById,
};
