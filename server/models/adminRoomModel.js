const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roomSchema=new schema({
    roomCategoryId:{
        type:mongoose.Schema.ObjectId,
        ref:"roomCategory_tbl"
    },
    roomType:{
        type:String,
        required: [true, "Please, Enter Room Type"],
        trim: true,
    },
    price:{
        type: String,
        required: [true, "Please, Enter price"],
        trim: true,
    },
    noOfAdults:{
        type:String,
        required:true,
    },
    noOfChildren:{
        type:String,
        required:true,
    },        
    description:{
        type:String,
        required: [true, "Please, Enter description"],
        trim: true,
    },
    image:{
        type:String
    },
    cloudinaryId:{
        type:String
    },
    url:{
        type:String
    },
    isStatus:{
        type:Boolean,
        default:false
    },
    isBooking:{
        type:Boolean,
        default:false
    }
    
}, { timestamps:true })

const roomModel = mongoose.model('room_tbl', roomSchema)

module.exports = roomModel