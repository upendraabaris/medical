const EventBookingModel = require("../models/eventBookingModel")

const getEventBooking = async(req,res,next)=>{
    try{
        // let client = await Client.get('EventBooking');
        // let EventBooking;
        // if(client == null) {
        //     EventBooking = await EventBookingModel.find()
        //     await Client.set(`EventBooking`, JSON.stringify(EventBooking));
        // }
        // else {
        //     EventBooking = JSON.parse(client);
        // }
        const EventBooking = await EventBookingModel.find()
        res.data = EventBooking
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getEventBookingById = async(req,res,next)=>{
    try{
        const EventBooking = await EventBookingModel.findById(req.params.id);
        res.data = EventBooking
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addEventBooking = async(req,res,next)=>{
    try{
        const EventBooking = await EventBookingModel.create(req.body);
        res.data = EventBooking
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateEventBooking = async(req,res,next)=>{
    try{
        const EventBooking = await EventBookingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EventBooking
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteEventBooking = async(req,res,next)=>{
    try{
        const EventBooking = await EventBookingModel.findByIdAndDelete(req.params.id);
        res.data = EventBooking
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

module.exports = {getEventBooking, getEventBookingById, addEventBooking, updateEventBooking, deleteEventBooking}
