const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user_tbl"
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: [validator.isInt, "Phone Number must be numbers..."],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    message: {
      type: String,
      required: [true, "Message is Required"],
    },
    status:{
        type: String,
        default:'UnRead'
    },
    isStatus:{
      type:Boolean,
      default:false
    }
  },
  { timestamps:true}
);

const userContactSchema = mongoose.model("userContact_tbl", schema);

module.exports = userContactSchema;
