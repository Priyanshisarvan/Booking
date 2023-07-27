require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const morgan=require('morgan');

//routes
const userRoute=require('./routes/userRoute');
const staffRoute=require('./routes/staffRoute');
const roomRoute=require('./routes/adminRoomRoute');
const feedbackRoute=require('./routes/feedbackRoute');
const rommCategory=require('./routes/roomCatgeoryRoute');
const contactRoute=require('./routes/userContactRoute');
const roomReserveRoute=require('./routes/roomReservationRoute');

const app=express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'))



app.use("/user",userRoute);
app.use('/staff',staffRoute);
app.use('/adminAddRoom',roomRoute);
app.use('/feedback',feedbackRoute);
app.use('/contact',contactRoute);
app.use('/roomReserve',roomReserveRoute);
app.use('/roomCategory',rommCategory);

const port=process.env.PORT || 4000;
const uri=process.env.ATLAS_URI;

mongoose.connect(uri)
.then(()=>{
    console.log('Mongodb Connection Sucessfull...');
})
.catch((error)=>{
    console.log('Mongodb Connection Failed..',error.message);

})
app.listen(port,()=>{
    console.log(`Server running on port...' ${port}`);
});

