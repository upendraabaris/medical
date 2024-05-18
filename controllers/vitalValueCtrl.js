const VitalValueModel = require("../models/vitalValueModel")
const Client = require("../middleware/redis")
const getVitalValue = async(req,res,next)=>{
    try{
        // let client = await Client.get('VitalValue');
        // let VitalValue;
        // if(client == null) {
        //     VitalValue = await VitalValueModel.find()
        //     await Client.set(`VitalValue`, JSON.stringify(VitalValue));
        // }
        // else {
        //     VitalValue = JSON.parse(client);
        // }
        const VitalValue = await VitalValueModel.find({user_id:req.body.user_id,vital_parameter_id:req.body.vital_parameter_id}).sort({ createdAt: -1 }).limit(5)
        res.data = VitalValue
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

const getVitalValueById = async(req,res,next)=>{
    try{
        const VitalValue = await VitalValueModel.findById(req.params.id);
        res.data = VitalValue
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

const addVitalValue = async(req,res,next)=>{
    try{
        // console.log(req.user)
        // let health_facility_id = req.user
        // req.body.health_facility_id = health_facility_id
        const VitalValue = await VitalValueModel.create(req.body);
        res.data = VitalValue
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

const updateVitalValue = async(req,res,next)=>{
    try{
        const VitalValue = await VitalValueModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = VitalValue
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

const deleteVitalValue = async(req,res,next)=>{
    try{
        const VitalValue = await VitalValueModel.findByIdAndDelete(req.params.id);
        res.data = VitalValue
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

const deleteAllVitalValue = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await VitalValueModel.deleteMany({_id: { $in: idToDelete}});
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

module.exports = {getVitalValue, getVitalValueById, addVitalValue, updateVitalValue, deleteVitalValue, deleteAllVitalValue}
