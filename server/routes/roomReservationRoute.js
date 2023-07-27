const express=require('express')
const router=express.Router();
const authenticate=require('../middleware/authenticate');
const adminAuthenticate=require('../middleware/adminAuthenticate');

const {addRoomReserve, getAllReservedRooms, deleteReserveRooms, updateBookingStatus, getBookingDetailById, getRoomReserveStatus, getBookingDetailByUserId, getBookingDetailByItsStatus,  checkInStatus, checkOutStatus, getBookingDetails, deleteBookedRooms}=require('../controllers/roomReservationController');

router
    .post('/addRoomReserve/:roomId',authenticate,addRoomReserve)
    .get('/getAllReservedRooms',getAllReservedRooms)
    .delete('/deleteReserveRoom/:id',deleteReserveRooms)
    .patch('/updateBookingStatus/:roomReserveId/:status',updateBookingStatus)
    .get('/getBookingDetailByUserId',getBookingDetailByUserId)
    // .post('/getBookingDetailByItsStatus',getBookingDetailByItsStatus)
    // .post('/getBookingDetailById/:id',getBookingDetailById)
    // .post('/getRoomReserveStatus',getRoomReserveStatus)
    .get('/getBookingDetailByItsStatus',getBookingDetailByItsStatus)
    .get('/getBookingDetailById/:id',getBookingDetailById)
    .get('/getRoomReserveStatus',getRoomReserveStatus)

    .get('/checkInStatus/:id',checkInStatus)
    .get('/checkOutStatus/:id',checkOutStatus)
    .get('/getBookingDetails',adminAuthenticate,getBookingDetails)
    .delete('/deleteBookedRooms/:id',deleteBookedRooms)  

module.exports=router