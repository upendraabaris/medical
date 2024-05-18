const VitalGroupModel = require("../models/vitalGroupModel")
const Client = require("../middleware/redis")
const getVitalGroup = async(req,res,next)=>{
    try{
        // let client = await Client.get('VitalGroup');
        // let VitalGroup;
        // if(client == null) {
        //     VitalGroup = await VitalGroupModel.find()
        //     await Client.set(`VitalGroup`, JSON.stringify(VitalGroup));
        // }
        // else {
        //     VitalGroup = JSON.parse(client);
        // }
        const VitalGroup = await VitalGroupModel.find()
        res.data = VitalGroup
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

const getVitalGroupById = async(req,res,next)=>{
    try{
        const VitalGroup = await VitalGroupModel.findById(req.params.id);
        res.data = VitalGroup
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

const addVitalGroup = async(req,res,next)=>{
    try{
        console.log(req.body);
        const VitalGroup = await VitalGroupModel.create(req.body);
        res.data = VitalGroup
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

const updateVitalGroup = async(req,res,next)=>{
    try{
        const VitalGroup = await VitalGroupModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = VitalGroup
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

const deleteVitalGroup = async(req,res,next)=>{
    try{
        const VitalGroup = await VitalGroupModel.findByIdAndDelete(req.params.id);
        res.data = VitalGroup
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

const deleteAllVitalGroup = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await VitalGroupModel.deleteMany({_id: { $in: idToDelete}});
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

module.exports = {getVitalGroup, getVitalGroupById, addVitalGroup, updateVitalGroup, deleteVitalGroup, deleteAllVitalGroup}
