const NbsuChiefComplaintTransModel = require("../models/nbsuChiefComplaintTransactionModel")
const Client = require("../middleware/redis")
const getNbsuChiefComplaintTrans = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbsuChiefComplaintTrans');
        // let NbsuChiefComplaintTrans;
        // if(client == null) {
        //     NbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.find()
        //     await Client.set(`NbsuChiefComplaintTrans`, JSON.stringify(NbsuChiefComplaintTrans));
        // }
        // else {
        //     NbsuChiefComplaintTrans = JSON.parse(client);
        // }
        const NbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.find({patient_id:req.params.id})
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')
        .populate('compliant_id', 'chief_complaint');
        res.data = NbsuChiefComplaintTrans
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

const getNbsuChiefComplaintTransById = async(req,res,next)=>{
    try{
        const NbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.findById(req.params.id);
        res.data = NbsuChiefComplaintTrans
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

const addNbsuChiefComplaintTrans = async(req,res,next)=>{
    try{
        console.log(req.user)
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.create(req.body);
        res.data = NbsuChiefComplaintTrans
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

const updateNbsuChiefComplaintTrans = async(req,res,next)=>{
    try{
        const NbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuChiefComplaintTrans
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

const deleteNbsuChiefComplaintTrans = async(req,res,next)=>{
    try{
        const NbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.findByIdAndDelete(req.params.id);
        res.data = NbsuChiefComplaintTrans
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

const deleteAllNbsuChiefComplaintTrans = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteNbsuChiefComplaintTrans = await NbsuChiefComplaintTransModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteNbsuChiefComplaintTrans;
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

module.exports = {getNbsuChiefComplaintTrans, getNbsuChiefComplaintTransById, addNbsuChiefComplaintTrans, updateNbsuChiefComplaintTrans, deleteNbsuChiefComplaintTrans, deleteAllNbsuChiefComplaintTrans}
