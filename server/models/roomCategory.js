const mongoose = require('mongoose')
const validator = require('validator')

const schema = new mongoose.Schema({

    roomCategory:{
        type:String,
        required: [true, 'roomCategory is Required'],
    },
    isStatus:{
        type:Boolean,
        default:false
    }
}, { timestamps:true })


const roomCategoryModel = mongoose.model('roomCategory_tbl', schema)

module.exports = roomCategoryModel