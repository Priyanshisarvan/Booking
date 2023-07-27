const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/authenticate');
const adminAuthenticate=require('../middleware/adminAuthenticate');

const { addUserContact, getAllUsersContact, deleteUserContact, getUserContactDetailById, userContactStatusUpdate } = require('../controllers/userContactController');

router
    .post('/addUserContact', addUserContact)
    .get('/getAllUsersContact',adminAuthenticate, getAllUsersContact)
    .delete('/deleteUserContact/:id',adminAuthenticate, deleteUserContact)
    .get('/getUserContactDetailById/:id',adminAuthenticate, getUserContactDetailById)
    .patch('/userContactStatusUpdate/:id',adminAuthenticate, userContactStatusUpdate)
    
module.exports=router
