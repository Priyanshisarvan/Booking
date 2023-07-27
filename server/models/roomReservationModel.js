const mongoose = require("mongoose");

const roomReservationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user_tbl"
    },   
    roomId:{
        type:mongoose.Schema.ObjectId,
        ref:"room_tbl"
        
    },
    roomCatgoryId:{
        type:mongoose.Schema.ObjectId,
        ref:"roomCategory_tbl"
    },
    noOfDays:{
        type:String,
        required:true
    },
    noOfAdults:{
        type:String,
        required:true,
    },
    noOfChildren:{
        type:String,
        required:true,
    },    
    checkIn:{
        type:String,
        required:true
    },
    checkOut:{
        type:String,
        required:true
    },
    bookingDate:{
        type:Date,
        default:Date.now
    },
    payment:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:' '
    },
    isStatus:{
        type:Boolean,
        default:false
    },
    checkInStatus:{
        type:Boolean,
        default:'false'
    },
    checkOutStatus:{
        type:Boolean,
        default:'false'
    },
    isBooked:{
        type:Boolean,
        default:false
    }

}, { timestamps:true })

const roomReservationModel=mongoose.model('roomReserve_tbl',roomReservationSchema);

module.exports=roomReservationModel
