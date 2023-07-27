const express=require('express')
const router=express.Router();
const {addFeedback, getAllFeedbacks, deleteFeedback, updateFeedback, getFeedbackById}=require('../controllers/feedbackController');
const authenticate=require('../middleware/authenticate');
const adminAuthenticate=require('../middleware/adminAuthenticate');

router
    .post('/addfeedback',authenticate,addFeedback)
    .get('/getAllFeedback',getAllFeedbacks)
    .delete('/deleteFeedback/:feedbackId',adminAuthenticate,deleteFeedback)
    .patch('/updateFeedback/:feedbackId',updateFeedback)
    .get('/getFeedbackById/:id',getFeedbackById)

module.exports=router;
