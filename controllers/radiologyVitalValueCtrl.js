const RadiologyVitalValueModel = require("../models/radiologyVitalValueModel")
const abnormalVitalModel = require("../models/radiologyAbnormalModel")
const Client = require("../middleware/redis")
const getRadiologyVitalValue = async(req,res,next)=>{
    try{
        // let client = await Client.get('RadiologyVitalValue');
        // let RadiologyVitalValue;
        // if(client == null) {
        //     RadiologyVitalValue = await RadiologyVitalValueModel.find()
        //     await Client.set(`RadiologyVitalValue`, JSON.stringify(RadiologyVitalValue));
        // }
        // else {
        //     RadiologyVitalValue = JSON.parse(client);
        // }
        const RadiologyVitalValue = await RadiologyVitalValueModel.find({user_id:req.body.user_id,vital_parameter_id:req.body.vital_parameter_id}).sort({ createdAt: -1 }).limit(5)
        
        let radiology = JSON.parse(JSON.stringify(RadiologyVitalValue))?.map(radiologyId => radiologyId._id) || []
        console.log(radiology)
        // console.log(RadiologyVitalValue)
        if(RadiologyVitalValue){
            const Radiologyabnormal = await abnormalVitalModel.find({radiology_vital_value_id: {$in:radiology}}).populate('radiology_vital_value_id').populate('radiology_diagnosis_id','vitalParameterId radiologyDiagnosisName')
            // console.log(abnormal)
            return res.status(200).json({messgae: 'Success', data:{ Radiologyabnormal}})
        }

        // res.data = {RadiologyVitalValue, abnormal}
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

const getRadiologyVitalValueById = async(req,res,next)=>{
    try{
        const RadiologyVitalValue = await RadiologyVitalValueModel.findById(req.params.id);
        res.data = RadiologyVitalValue
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
const RadiologyAbnormalModel = require("../models/radiologyAbnormalModel")
const addRadiologyVitalValue = async(req,res,next)=>{
    try{
        console.log(req.body);
        const RadiologyVitalValue = await RadiologyVitalValueModel.create(req.body);

        const radiologyDiagnosisId = RadiologyVitalValue._id;

        const RadiologyAbnormal = await RadiologyAbnormalModel.create({radiology_vital_value_id:radiologyDiagnosisId,radiology_diagnosis_id:req.body.abnormal})
        console.log(RadiologyAbnormal)

        res.data = RadiologyVitalValue
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

const updateRadiologyVitalValue = async(req,res,next)=>{
    try{
        const RadiologyVitalValue = await RadiologyVitalValueModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = RadiologyVitalValue
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

const deleteRadiologyVitalValue = async(req,res,next)=>{
    try{
        const RadiologyVitalValue = await RadiologyVitalValueModel.findByIdAndDelete(req.params.id);
        res.data = RadiologyVitalValue
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

const deleteAllRadiologyVitalValue = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await RadiologyVitalValueModel.deleteMany({_id: { $in: idToDelete}});
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

module.exports = {getRadiologyVitalValue, getRadiologyVitalValueById, addRadiologyVitalValue, updateRadiologyVitalValue, deleteRadiologyVitalValue, deleteAllRadiologyVitalValue}
