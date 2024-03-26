const HealthTipModel = require("../models/healthTipModel")
const Client = require("../middleware/redis")
const getHealthTip = async(req,res,next)=>{
    try{
        // let client = await Client.get('HealthTip');
        // let HealthTip;
        // if(client == null) {
        //     HealthTip = await HealthTipModel.find()
        //     await Client.set(`HealthTip`, JSON.stringify(HealthTip));
        // }
        // else {
        //     HealthTip = JSON.parse(client);
        // }
        const HealthTip = await HealthTipModel.find()
        res.data = HealthTip
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

const getHealthTipById = async(req,res,next)=>{
    try{
        const HealthTip = await HealthTipModel.findById(req.params.id);
        res.data = HealthTip
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

const addHealthTip = async(req,res,next)=>{
    try{
        const HealthTip = await HealthTipModel.create(req.body);
        res.data = HealthTip
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

const updateHealthTip = async(req,res,next)=>{
    try{
        const HealthTip = await HealthTipModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HealthTip
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

const deleteHealthTip = async(req,res,next)=>{
    try{
        const HealthTip = await HealthTipModel.findByIdAndDelete(req.params.id);
        res.data = HealthTip
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

const deleteAllHealthTip = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHealthTip = await HealthTipModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteHealthTip;
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

module.exports = {getHealthTip, getHealthTipById, addHealthTip, updateHealthTip, deleteHealthTip, deleteAllHealthTip}
