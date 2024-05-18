const NbsuPatientModel = require("../models/nbsuPatientModel")
const Client = require("../middleware/redis")
const getNbsuPatient = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbsuPatient');
        // let NbsuPatient;
        // if(client == null) {
        //     NbsuPatient = await NbsuPatientModel.find()
        //     await Client.set(`NbsuPatient`, JSON.stringify(NbsuPatient));
        // }
        // else {
        //     NbsuPatient = JSON.parse(client);
        // }
        const NbsuPatient = await NbsuPatientModel.find({health_facility_id:req.params.id})
        .populate('health_facility_id', 'firstname lastname')
            .populate('type_of_admission', '_id admission_type')
            .populate('doctor_incharge', 'firstname lastname')
            .populate('addedBy', 'first_name last_name')
            .populate('relation1','relationtype')
            .populate('relation2','relationtype')
        res.data = NbsuPatient
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


const getNbsuPatientById = async(req,res,next)=>{
    try{
        const NbsuPatient = await NbsuPatientModel.findById(req.params.id)
        .populate('health_facility_id', 'firstname lastname')
            .populate('type_of_admission', '_id admission_type')
            .populate('addedBy', 'first_name last_name')
            .populate('relation1','relationtype')
            .populate('relation2','relationtype')
        res.data = NbsuPatient
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

const getNbsuPatientParticularById = async(req,res,next)=>{
    try{
        const NbsuPatient = await NbsuPatientModel.findById(req.params.id).select('nbsu_reg_no rch_no').populate({path:'doctor_incharge', select:'firstname lastname'});
        res.data = NbsuPatient
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

const addNbsuPatient = async(req,res,next)=>{
    try{
        console.log(req.user)
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbsuPatient = await NbsuPatientModel.create(req.body);
        res.data = NbsuPatient
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

const updateNbsuPatient = async(req,res,next)=>{
    try{
        const NbsuPatient = await NbsuPatientModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuPatient
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

const deleteNbsuPatient = async(req,res,next)=>{
    try{
        const NbsuPatient = await NbsuPatientModel.findByIdAndDelete(req.params.id);
        res.data = NbsuPatient
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

const deleteAllNbsuPatient = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteNbsuPatient = await NbsuPatientModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteNbsuPatient;
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

module.exports = {getNbsuPatient, getNbsuPatientById, addNbsuPatient, updateNbsuPatient, deleteNbsuPatient, deleteAllNbsuPatient, getNbsuPatientParticularById}
