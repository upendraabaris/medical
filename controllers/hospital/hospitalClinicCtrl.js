const HospitalClinicModel = require("../../models/hospital/hospitalClinicModel")
const UserModel = require("../../models/user/userModel")

const getHospitalClinic = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.find().populate('hos_clinic_type_id');
        res.data = HospitalClinic
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

const getHospitalClinicById = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.findById(req.params.id).populate('hos_clinic_type_id');
        res.data = HospitalClinic
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

const addHospitalClinic = async(req,res,next)=>{
    try{
        console.log(req.body);
        const HospitalClinic = await HospitalClinicModel.create(req.body);
        res.data = HospitalClinic
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

const updateHospitalClinic = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HospitalClinic
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

const deleteHospitalClinic = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.findByIdAndDelete(req.params.id);
        res.data = HospitalClinic
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

const getFavorite = async(req,res, next) =>{
    try{
        const user = await UserModel.findById(req.user)
        let filter = { _id: { $in: user.isFavorite } };
        if(req.params.id != null && req.params.id != "null" && req.params.id != ""){
            filter = { ...filter, hos_clinic_type_id: req.params.id }
        }
        let [favorite] = await Promise.all([HospitalClinicModel.find(filter)])
        res.data = { favorite }
        next()
    }
    catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}



const getHospitalClinicPublic = async(req,res,next)=>{
    try{


        const user = await UserModel.findById(req.user)
        let filter = { _id: { $nin: user.isFavorite } };
        if(req.params.id != null && req.params.id != "null" && req.params.id != ""){
            filter = { ...filter, hos_clinic_type_id: req.params.id }
        }
        const HospitalClinic = await HospitalClinicModel.find(filter).skip(req.query.page*req.query.count).limit(req.query.count).populate('hos_clinic_type_id');
        res.data = HospitalClinic
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

// http://localhost:5000/api/hospitalclinic/getfavorite/65e08c411c23952bbb684ca9?page=0&count=1


const deleteAllHospital = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHospital = await HospitalClinicModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteHospital;
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

module.exports = {getHospitalClinic, getHospitalClinicById, addHospitalClinic, updateHospitalClinic, deleteHospitalClinic, getFavorite, getHospitalClinicPublic, deleteAllHospital}
