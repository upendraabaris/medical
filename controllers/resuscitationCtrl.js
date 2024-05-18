const ResuscitationModel = require("../models/ResuscitationModel")
const Client = require("../middleware/redis")
const getResuscitation = async(req,res,next)=>{
    try{
        // let client = await Client.get('Resuscitation');
        // let Resuscitation;
        // if(client == null) {
        //     Resuscitation = await ResuscitationModel.find()
        //     await Client.set(`Resuscitation`, JSON.stringify(Resuscitation));
        // }
        // else {
        //     Resuscitation = JSON.parse(client);
        // }
        const Resuscitation = await ResuscitationModel.find()
        res.data = Resuscitation
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

const getResuscitationById = async(req,res,next)=>{
    try{
        const Resuscitation = await ResuscitationModel.findById(req.params.id);
        res.data = Resuscitation
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

const addResuscitation = async(req,res,next)=>{
    try{
        console.log(req.body);
        const Resuscitation = await ResuscitationModel.create(req.body);
        res.data = Resuscitation
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

const updateResuscitation = async(req,res,next)=>{
    try{
        const Resuscitation = await ResuscitationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Resuscitation
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

const deleteResuscitation = async(req,res,next)=>{
    try{
        const Resuscitation = await ResuscitationModel.findByIdAndDelete(req.params.id);
        res.data = Resuscitation
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

const deleteAllResuscitation = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await ResuscitationModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteHistory;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}

module.exports = {getResuscitation, getResuscitationById, addResuscitation, updateResuscitation, deleteResuscitation, deleteAllResuscitation}
