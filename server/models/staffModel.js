const mongoose = require("mongoose");
const schema = mongoose.Schema;

const staffSchema = new schema(
  {
    name: 
    {
        type: String,
        required: [true, "Please, Enter Staff Name"],
        trim: true,
    },
    age: 
    {
      type: String,
      required: [true, "Please, Enter staff age"],
      trim: true,

    },
    gender: 
    {
      type: String,
      required: [true, "Please,select gender"],
      trim: true,
    },
    phoneNo: 
    {
      type: String,
      maxlength:10,
      required: [true, "Please, Enter PhoneNo"],
      trim: true,
    },
    email: 
    {
      type: String,
      required: [true, "Please, Enter staff email ID"],
      trim: true,
    },
    jobRole: 
    {    
      type:String,
      required: [true, "Please, Enter staff job role"],      
    },  
    cloudinaryId:{
        type:String
    },
    photo: 
    {
      type: String,
    },  
    url:{
        type:String
    },
    regDate: 
    {
      type: Date,
      default: Date.now,
    },
    isStatus:{
      type:Boolean,
      default:false
    }
  },
  { timestamps:true }
);

const staffModel = mongoose.model("staff_tbl", staffSchema);

module.exports = staffModel;
