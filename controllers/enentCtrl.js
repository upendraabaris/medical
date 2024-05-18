const EventModel = require("../models/eventModel")

const getEvent = async(req,res,next)=>{
    try{
        // let client = await Client.get('Event');
        // let Event;
        // if(client == null) {
        //     Event = await EventModel.find()
        //     await Client.set(`Event`, JSON.stringify(Event));
        // }
        // else {
        //     Event = JSON.parse(client);
        // }
        const Event = await EventModel.find()
        .populate({
            path: 'country city',
            select: '_id country_name city_name'
          })
          .populate({
            path: 'speciality',
            select: '_id medical_specialty'
          })
          .populate({
            path: 'currency',
            select: '_id currency_name'
          })
        .populate({path: 'packageType', model:'PackageType', select:'package_type'})
        .populate({path: 'eventType', select:'event_type'})
        .populate({path: 'partnerHospital', select:'firstname'})
        .populate({path: 'partnerDoctor', select: 'firstname lastname'})
        res.data = Event
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

const getEventById = async(req,res,next)=>{
    try{
        const Event = await EventModel.findById(req.params.id);
        res.data = Event
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
const currencyModel =  require("../models/currencyModel")
const addEvent = async(req,res,next)=>{
    try{
        let country_id = req.body.country
        console.log(country_id)
        let currency = await currencyModel.findOne({country_id})
        console.log(currency)
        req.body.currency = currency._id
        const Event = await EventModel.create(req.body);
        res.data = Event
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

const updateEvent = async(req,res,next)=>{
    try{
        const Event = await EventModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Event
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

const deleteEvent = async(req,res,next)=>{
    try{
        const Event = await EventModel.findByIdAndDelete(req.params.id);
        res.data = Event
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

module.exports = {getEvent, getEventById, addEvent, updateEvent, deleteEvent}
