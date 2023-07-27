const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema= new Schema({
    userId:{
       
        type:mongoose.Schema.ObjectId,
        ref:"user_tbl"
    },
    comments:
    {
        type:String,
        required:true,
    },
    ratings:{
        type:String,
        required:true,
        maxlength:5

    },
    date:{
        type:Date,
        default:Date.now,
    }

}, { timestamps:true })

const feedbackModel=mongoose.model('feedback_tbl',feedbackSchema);
module.exports=feedbackModel;
