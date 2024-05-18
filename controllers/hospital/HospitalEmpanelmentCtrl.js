const HospitalEmpanelmentModel = require("../../models/hospital/HospitalEmpanelmentModel")

const getHospitalEmpanelment = async(req,res,next)=>{
    try{
        const HospitalEmpanelment = await HospitalEmpanelmentModel.find();
        res.data = HospitalEmpanelment
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

const getHospitalEmpanelmentById = async(req,res,next)=>{
    try{
        const HospitalEmpanelment = await HospitalEmpanelmentModel.findById(req.params.id);
        res.data = HospitalEmpanelment
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

const addHospitalEmpanelment = async(req,res,next)=>{
    try{
        console.log(req.body);
        const HospitalEmpanelment = await HospitalEmpanelmentModel.create(req.body);
        res.data = HospitalEmpanelment
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

const updateHospitalEmpanelment = async(req,res,next)=>{
    try{
        const HospitalEmpanelment = await HospitalEmpanelmentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HospitalEmpanelment
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

const deleteHospitalEmpanelment = async(req,res,next)=>{
    try{
        const HospitalEmpanelment = await HospitalEmpanelmentModel.findByIdAndDelete(req.params.id);
        res.data = HospitalEmpanelment
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

const deleteAllHospitalEmpanelment = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHospitalEmpanelment = await HospitalEmpanelmentModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteHospitalEmpanelment;
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

module.exports = {getHospitalEmpanelment, getHospitalEmpanelmentById, addHospitalEmpanelment, updateHospitalEmpanelment, deleteHospitalEmpanelment, deleteAllHospitalEmpanelment}
