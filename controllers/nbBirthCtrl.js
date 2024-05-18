const NbBirthDataModel = require("../models/nbBirthModel")
const Client = require("../middleware/redis")
const getNbBirthData = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbBirthData');
        // let NbBirthData;
        // if(client == null) {
        //     NbBirthData = await NbBirthDataModel.find()
        //     await Client.set(`NbBirthData`, JSON.stringify(NbBirthData));
        // }
        // else {
        //     NbBirthData = JSON.parse(client);
        // }
        const NbBirthData = await NbBirthDataModel.findOne({patient_id:req.params.id})
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname');
        // .populate({path:'resuscitationDetailsId', select:'_id name '})
        res.data = NbBirthData
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

const getNbBirthDataById = async(req,res,next)=>{
    try{
        const NbBirthData = await NbBirthDataModel.findById(req.params.id).populate('health_facility_id', 'first_name last_name');
        res.data = NbBirthData
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

const addNbBirthData = async(req,res,next)=>{
    try{
        console.log(req.user)
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbBirthData = await NbBirthDataModel.create(req.body);
        res.data = NbBirthData
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

const updateNbBirthData = async(req,res,next)=>{
    try{
        const NbBirthData = await NbBirthDataModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbBirthData
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

const deleteNbBirthData = async(req,res,next)=>{
    try{
        const NbBirthData = await NbBirthDataModel.findByIdAndDelete(req.params.id);
        res.data = NbBirthData
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

const deleteAllNbBirthData = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteNbBirthData = await NbBirthDataModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteNbBirthData;
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

module.exports = {getNbBirthData, getNbBirthDataById, addNbBirthData, updateNbBirthData, deleteNbBirthData, deleteAllNbBirthData}
