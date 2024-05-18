const GeneralExaminationModel = require("../models/generalExaminationModel")
const patientVitalInfoModel = require("../models/patientVitalInfoModel")
const Client = require("../middleware/redis")
const getGeneralExamination = async(req,res,next)=>{
    try{
        // let client = await Client.get('GeneralExamination');
        // let GeneralExamination;
        // if(client == null) {
        //     GeneralExamination = await GeneralExaminationModel.find()
        //     await Client.set(`GeneralExamination`, JSON.stringify(GeneralExamination));
        // }
        // else {
        //     GeneralExamination = JSON.parse(client);
        // }
        const GeneralExamination = await GeneralExaminationModel.find({patient_id:req.params.id})
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')

        let general = JSON.parse(JSON.stringify(GeneralExamination))?.map(generalId => generalId.patient_id) || []
        console.log(general)

        if(general){
            const patientVitalInfo = await patientVitalInfoModel.find({patient_id: {$in:general}})
            // console.log(abnormal)
            return res.status(200).json({messgae: 'Success', data:{ GeneralExamination, patientVitalInfo}})
        }
        // const patientVital = await patientVitalInfoModel
        // res.data = GeneralExamination
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


const getGeneralExaminationVitalInfo = async(req,res,next)=>{
    try{
        // let client = await Client.get('GeneralExamination');
        // let GeneralExamination;
        // if(client == null) {
        //     GeneralExamination = await GeneralExaminationModel.find()
        //     await Client.set(`GeneralExamination`, JSON.stringify(GeneralExamination));
        // }
        // else {
        //     GeneralExamination = JSON.parse(client);
        // }
        const GeneralExamination = await GeneralExaminationModel.find({patient_id:req.params.id})
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')

        let general = JSON.parse(JSON.stringify(GeneralExamination))?.map(generalId => generalId.patient_id) || []
        console.log(general)

        if(general){
            const patientVitalInfo = await patientVitalInfoModel.find({patient_id: {$in:general}})
            .populate('patient_id', 'mother_name father_name')
            .populate('health_facility_id', 'first_name last_name')
            // console.log(abnormal)
            return res.status(200).json({messgae: 'Success', data:{ patientVitalInfo}})
        }
        // const patientVital = await patientVitalInfoModel
        // res.data = GeneralExamination
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

const getGeneralExaminationById = async(req,res,next)=>{
    try{
        const GeneralExamination = await GeneralExaminationModel.findById(req.params.id);
        res.data = GeneralExamination
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
const addGeneralExamination = async(req,res,next)=>{
    try{
        console.log(req.user)
        let addedBy = req.user
        req.body.addedBy = addedBy
        const GeneralExamination = await GeneralExaminationModel.create(req.body);
        const patientVitalInfoData = {
            respiratoryRate: req.body.respiratoryRate,
            bodyTemperature: req.body.bodyTemperature,
            bloodPressure: {
                systolic: req.body.bloodPressure.systolic,
                diastolic: req.body.bloodPressure.diastolic
            },
            oxygenSaturation: req.body.oxygenSaturation,
            bloodSugar: req.body.bloodSugar,
            heart_rate: req.body.heart_rate,
            dateTime: req.body.dateTime || Date.now(),
            patient_id: req.body.patient_id,
            health_facility_id: req.body.health_facility_id,
            // user_id: undefined
        };
        const patientVitalInfo = await patientVitalInfoModel.create(patientVitalInfoData)
        res.data = { GeneralExamination, patientVitalInfo }
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

const addGeneralExaminationDuringLabour = async(req,res,next)=>{
    try{
        // console.log(req.user)
        // let health_facility_id = req.user
        // req.body.health_facility_id = health_facility_id
        const GeneralExamination = await GeneralExaminationModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        res.data = GeneralExamination
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

const updateGeneralExamination = async(req,res,next)=>{
    try{
        const GeneralExamination = await GeneralExaminationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = GeneralExamination
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

const deleteGeneralExamination = async(req,res,next)=>{
    try{
        const GeneralExamination = await GeneralExaminationModel.findByIdAndDelete(req.params.id);
        res.data = GeneralExamination
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

const deleteAllGeneralExamination = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteGeneralExamination = await GeneralExaminationModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteGeneralExamination;
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

module.exports = {getGeneralExamination, getGeneralExaminationById, addGeneralExamination, updateGeneralExamination, deleteGeneralExamination, deleteAllGeneralExamination, addGeneralExaminationDuringLabour, getGeneralExaminationVitalInfo}
