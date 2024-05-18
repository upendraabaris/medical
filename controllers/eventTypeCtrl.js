const EventTypeModel = require("../models/eventTypeModel")

const getEventType = async(req,res,next)=>{
    try{
        // let client = await Client.get('EventType');
        // let EventType;
        // if(client == null) {
        //     EventType = await EventTypeModel.find()
        //     await Client.set(`EventType`, JSON.stringify(EventType));
        // }
        // else {
        //     EventType = JSON.parse(client);
        // }
        const EventType = await EventTypeModel.find()
        res.data = EventType
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

const getEventTypeById = async(req,res,next)=>{
    try{
        const EventType = await EventTypeModel.findById(req.params.id);
        res.data = EventType
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

const addEventType = async(req,res,next)=>{
    try{
        const EventType = await EventTypeModel.create(req.body);
        res.data = EventType
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

const updateEventType = async(req,res,next)=>{
    try{
        const EventType = await EventTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EventType
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

const deleteEventType = async(req,res,next)=>{
    try{
        const EventType = await EventTypeModel.findByIdAndDelete(req.params.id);
        res.data = EventType
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

module.exports = {getEventType, getEventTypeById, addEventType, updateEventType, deleteEventType}
