const NbMotherDataModel = require("../models/nbMotherDataModel")
const Client = require("../middleware/redis")
const getNbMotherData = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbMotherData');
        // let NbMotherData;
        // if(client == null) {
        //     NbMotherData = await NbMotherDataModel.find()
        //     await Client.set(`NbMotherData`, JSON.stringify(NbMotherData));
        // }
        // else {
        //     NbMotherData = JSON.parse(client);
        // }
        const NbMotherData = await NbMotherDataModel.find()
        res.data = NbMotherData
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

const getNbMotherDataById = async(req,res,next)=>{
    try{
        const NbMotherData = await NbMotherDataModel.findOne({patient_id:req.params.id})
        .populate('patient_id', 'monther_name')
        .populate('health_facility_id', 'firstname lastname');
        res.data = NbMotherData
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

const addNbMotherData = async(req,res,next)=>{
    try{
        console.log(req.user)
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbMotherData = await NbMotherDataModel.create(req.body);
        res.data = NbMotherData
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

const addNbMotherDataDuringLabour = async(req,res,next)=>{
    try{
        // console.log(req.user)
        // let health_facility_id = req.user
        // req.body.health_facility_id = health_facility_id
        const NbMotherData = await NbMotherDataModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        res.data = NbMotherData
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

const updateNbMotherData = async(req,res,next)=>{
    try{
        const NbMotherData = await NbMotherDataModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbMotherData
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

const deleteNbMotherData = async(req,res,next)=>{
    try{
        const NbMotherData = await NbMotherDataModel.findByIdAndDelete(req.params.id);
        res.data = NbMotherData
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

const deleteAllNbMotherData = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteNbMotherData = await NbMotherDataModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteNbMotherData;
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

module.exports = {getNbMotherData, getNbMotherDataById, addNbMotherData, updateNbMotherData, deleteNbMotherData, deleteAllNbMotherData, addNbMotherDataDuringLabour}
