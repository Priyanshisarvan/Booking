import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import staffSlice from "./redux/staffSlice";
import addRoomSlice from "./redux/adRoomSlice";
import roomCategorySlice from "./redux/roomCategorySlice";
import bookingSlice from "./redux/bookingSlice";
import userContactSlice from "./redux/userContactSlice";
import feedbackSlice from "./redux/feedbackSlice";


const store=configureStore({
    reducer:{
        user:authSlice,
        staff:staffSlice,
        addRoom:addRoomSlice,
        roomCategory:roomCategorySlice,
        booking:bookingSlice,
        userContact:userContactSlice,
        feedback:feedbackSlice        
    }
})

export default store;