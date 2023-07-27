const mongoose = require('mongoose')
const validator = require('validator')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is Required'],
        validate:[validator.isAlpha,"FirstName must be characters..."]     

    },
    lastName: {
        type: String,
        required: [true, 'LastName is Required'],
        validate:[validator.isAlpha,"LastName must be characters..."]    

    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    city: {
        type: String,
        required: [true, 'City is Required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required'],
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'],
        
    },
    deleteReason:{
        type: String,
        default:'',
    },
    tempKey:{
        type:String,
        default:'',
    },
    is_admin:{
        type:Boolean,
        default:false,
    },
    is_verified:{
        type:Boolean,
        default:false,
    },
    isStatus:{
        type:Boolean,
        default:false,
    }
},
 { timestamps:true }
)

const userSchema = mongoose.model('user_tbl', schema)

module.exports = userSchema