const GeneralExaminationModel = require("../models/generalExaminationModel")
const patientVitalInfoModel = require("../models/patientVitalInfoModel")
const SystemicExaminationModel = require("../models/systemicExaminationModel")

const NbsuMedicationModel = require("../models/nbsuMedicationModel")
const NbsuTherapyModel = require("../models/nbsuTherapiesModel")
const NbsuResponseMappingModel = require("../models/nbsuResponseMappingModel")


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
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')

        let general = JSON.parse(JSON.stringify(GeneralExamination))?.map(generalId => generalId.patient_id) || []
        console.log(general)

        if(general){
            const patientVitalInfo = await patientVitalInfoModel.find({patient_id: {$in:general}})
            // console.log(abnormal)


            const SystemicExamination = await SystemicExaminationModel.find({patient_id: {$in:general}})
            .sort({ createdAt: -1 })
            .limit(-1)
            .populate('patient_id', 'mother_name father_name')
            .populate('addedBy', 'first_name last_name')
            .populate('health_facility_id', 'firstname lastname')
            return res.status(200).json({messgae: 'Success', data:{ GeneralExamination, SystemicExamination}})
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

const getAllExaminationReport = async(req,res,next)=>{
    try{
        const { page = 1, limit = 10 } = req.query
        // Pagination calculation
        const skip = (page - 1) * limit;
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
        .sort({ createdAt: -1 })
        // .limit(5)
        // .skip((page - 1) * limit)
        // .limit(Number(limit))
        .skip(skip)
        .limit(Number(limit))
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')

        let general = JSON.parse(JSON.stringify(GeneralExamination))?.map(generalId => generalId.patient_id) || []
        console.log(general)

        if(general){
            // const patientVitalInfo = await patientVitalInfoModel.find({patient_id: {$in:general}})
            // .skip(skip)
            // .limit(Number(limit))
            // console.log(abnormal)


            const SystemicExamination = await SystemicExaminationModel.find({patient_id: {$in:general}})
            .sort({ createdAt: -1 })
            // .limit(-1)
            .skip(skip)
            .limit(Number(limit))
            .populate('patient_id', 'mother_name father_name')
            .populate('addedBy', 'first_name last_name')
            .populate('health_facility_id', 'firstname lastname')

            const nbsuMedications = await NbsuMedicationModel.find({ patient_id: { $in: general } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('patient_id', 'mother_name father_name')
            .populate('addedBy', 'first_name last_name')
            .populate('health_facility_id', 'firstname lastname')
            .populate('doctor_incharge', 'firstname lastname')
            .populate('medication_id', 'medication_name');

            const nbsuTherapies = await NbsuTherapyModel.find({ patient_id: { $in: general } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('patient_id', 'mother_name father_name')
                .populate('addedBy', 'first_name last_name')
                .populate('health_facility_id', 'firstname lastname')
                .populate('doctor_incharge', 'firstname lastname')
                .populate('therapy_id','therapy_name');

            const nbsuResponseMappings = await NbsuResponseMappingModel.find({ patient_id: { $in: general } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('patient_id', 'mother_name father_name')
                .populate('addedBy', 'first_name last_name')
                .populate('health_facility_id', 'firstname lastname')
                .populate('doctor_incharge', 'firstname lastname')
                .populate('response_id', 'response');
                

            return res.status(200).json({messgae: 'Success', data:{ 
                GeneralExamination: GeneralExamination,
                SystemicExamination: SystemicExamination,
                // PatientVitalInfo: patientVitalInfo,
                NbsuMedications: nbsuMedications,
                NbsuTherapies: nbsuTherapies,
                NbsuResponseMappings: nbsuResponseMappings
             }})
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

// const getAllExaminationReport = async (req, res, next) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         // Pagination calculation
//         const skip = (page - 1) * limit;

//         // Fetch and transform GeneralExamination
//         const GeneralExaminationArray = await GeneralExaminationModel.find({ patient_id: req.params.id })
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(Number(limit))
//             .populate('patient_id', 'mother_name father_name')
//             .populate('addedBy', 'first_name last_name')
//             .populate('health_facility_id', 'firstname lastname');

//         const GeneralExamination = GeneralExaminationArray.reduce((acc, cur) => {
//             acc[cur._id] = cur;
//             return acc;
//         }, {});

//         const generalIds = GeneralExaminationArray.map(general => general.patient_id._id);

//         if (generalIds.length > 0) {
//             // Fetch and transform SystemicExamination
//             const SystemicExaminationArray = await SystemicExaminationModel.find({ patient_id: { $in: generalIds } })
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(Number(limit))
//                 .populate('patient_id', 'mother_name father_name')
//                 .populate('addedBy', 'first_name last_name')
//                 .populate('health_facility_id', 'firstname lastname');

//             const SystemicExamination = SystemicExaminationArray.reduce((acc, cur) => {
//                 acc[cur._id] = cur;
//                 return acc;
//             }, {});

//             // Fetch and transform NbsuMedications
//             const nbsuMedicationsArray = await NbsuMedicationModel.find({ patient_id: { $in: generalIds } })
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(Number(limit))
//                 .populate('patient_id', 'mother_name father_name')
//                 .populate('addedBy', 'first_name last_name')
//                 .populate('health_facility_id', 'firstname lastname')
//                 .populate('doctor_incharge', 'firstname lastname')
//                 .populate('medication_id', 'medication_name');

//             const NbsuMedications = nbsuMedicationsArray.reduce((acc, cur) => {
//                 acc[cur._id] = cur;
//                 return acc;
//             }, {});

//             // Fetch and transform NbsuTherapies
//             const nbsuTherapiesArray = await NbsuTherapyModel.find({ patient_id: { $in: generalIds } })
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(Number(limit))
//                 .populate('patient_id', 'mother_name father_name')
//                 .populate('addedBy', 'first_name last_name')
//                 .populate('health_facility_id', 'firstname lastname')
//                 .populate('doctor_incharge', 'firstname lastname')
//                 .populate('therapy_id', 'therapy_name');

//             const NbsuTherapies = nbsuTherapiesArray.reduce((acc, cur) => {
//                 acc[cur._id] = cur;
//                 return acc;
//             }, {});

//             // Fetch and transform NbsuResponseMappings
//             const nbsuResponseMappingsArray = await NbsuResponseMappingModel.find({ patient_id: { $in: generalIds } })
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(Number(limit))
//                 .populate('patient_id', 'mother_name father_name')
//                 .populate('addedBy', 'first_name last_name')
//                 .populate('health_facility_id', 'firstname lastname')
//                 .populate('doctor_incharge', 'firstname lastname')
//                 .populate('response_id', 'response');

//             const NbsuResponseMappings = nbsuResponseMappingsArray.reduce((acc, cur) => {
//                 acc[cur._id] = cur;
//                 return acc;
//             }, {});

//             return res.status(200).json({
//                 message: 'Success',
//                 data: {
//                     GeneralExamination,
//                     SystemicExamination,
//                     NbsuMedications,
//                     NbsuTherapies,
//                     NbsuResponseMappings
//                 }
//             });
//         }

//         res.status(200).json({
//             message: 'Success',
//             data: {
//                 GeneralExamination: {},
//                 SystemicExamination: {},
//                 NbsuMedications: {},
//                 NbsuTherapies: {},
//                 NbsuResponseMappings: {}
//             }
//         });
//     } catch (error) {
//         res.status(403).json({
//             error: true,
//             message: error.message,
//             data: {}
//         });
//         next();
//     }
// };


// const getAllExaminationReport = async (req, res, next) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         // Pagination calculation
//         const skip = (page - 1) * limit;

//         // Fetch GeneralExaminations
//         const GeneralExaminationArray = await GeneralExaminationModel.find({ patient_id: req.params.id })
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(Number(limit))
//             .populate('patient_id', 'mother_name father_name')
//             .populate('addedBy', 'first_name last_name')
//             .populate('health_facility_id', 'firstname lastname');

//         // Fetch relevant SystemicExaminations, NbsuMedications, NbsuTherapies, NbsuResponseMappings based on patient ids
//         const generalIds = GeneralExaminationArray.map(general => general.patient_id._id);

//         const SystemicExaminationArray = await SystemicExaminationModel.find({ patient_id: { $in: generalIds } })
//             .sort({ createdAt: -1 })
//             .populate('patient_id', 'mother_name father_name')
//             .populate('addedBy', 'first_name last_name')
//             .populate('health_facility_id', 'firstname lastname');

//         const nbsuMedicationsArray = await NbsuMedicationModel.find({ patient_id: { $in: generalIds } })
//             .sort({ createdAt: -1 })
//             .populate('patient_id', 'mother_name father_name')
//             .populate('addedBy', 'first_name last_name')
//             .populate('health_facility_id', 'firstname lastname')
//             .populate('doctor_incharge', 'firstname lastname')
//             .populate('medication_id', 'medication_name');

//         const nbsuTherapiesArray = await NbsuTherapyModel.find({ patient_id: { $in: generalIds } })
//             .sort({ createdAt: -1 })
//             .populate('patient_id', 'mother_name father_name')
//             .populate('addedBy', 'first_name last_name')
//             .populate('health_facility_id', 'firstname lastname')
//             .populate('doctor_incharge', 'firstname lastname')
//             .populate('therapy_id', 'therapy_name');

//         const nbsuResponseMappingsArray = await NbsuResponseMappingModel.find({ patient_id: { $in: generalIds } })
//             .sort({ createdAt: -1 })
//             .populate('patient_id', 'mother_name father_name')
//             .populate('addedBy', 'first_name last_name')
//             .populate('health_facility_id', 'firstname lastname')
//             .populate('doctor_incharge', 'firstname lastname')
//             .populate('response_id', 'response');

//         // Transform arrays into objects with descriptive keys
//         const data = {
//             GeneralExamination: transformToObject(GeneralExaminationArray, 'GeneralExamination'),
//             SystemicExamination: transformToObject(SystemicExaminationArray, 'SystemicExamination'),
//             NbsuMedications: transformToObject(nbsuMedicationsArray, 'NbsuMedications'),
//             NbsuTherapies: transformToObject(nbsuTherapiesArray, 'NbsuTherapies'),
//             NbsuResponseMappings: transformToObject(nbsuResponseMappingsArray, 'NbsuResponseMappings')
//         };

//         res.status(200).json({
//             message: 'Success',
//             data: data
//         });
//     } catch (error) {
//         res.status(403).json({
//             error: true,
//             message: error.message,
//             data: {}
//         });
//         next();
//     }
// };

// // Helper function to transform array to object with descriptive keys
// function transformToObject(array, prefix) {
//     return array.reduce((acc, cur) => {
//         acc[`${prefix}_${cur._id}`] = cur;
//         return acc;
//     }, {});
// }

module.exports = {getGeneralExamination, getGeneralExaminationById, addGeneralExamination, updateGeneralExamination, deleteGeneralExamination, deleteAllGeneralExamination, addGeneralExaminationDuringLabour, getGeneralExaminationVitalInfo, getAllExaminationReport}
