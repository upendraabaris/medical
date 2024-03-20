const StaffTypeModel = require("../../models/staff/staffTypeModel")
const Client = require("../../middleware/redis")
const getStaffType = async(req,res,next)=>{
    try{
        let client = await Client.get('StaffType');
        let StaffType;
        if(client == null) {
            StaffType = await StaffTypeModel.find()
            await Client.set(`StaffType`, JSON.stringify(StaffType));
        }
        else {
            StaffType = JSON.parse(client);
        }
        res.data = StaffType
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

const getStaffTypeById = async(req,res,next)=>{
    try{
        const StaffType = await StaffTypeModel.findById(req.params.id);
        res.data = StaffType
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

const addStaffType = async(req,res,next)=>{
    try{
        const StaffType = await StaffTypeModel.create(req.body);
        res.data = StaffType
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

const updateStaffType = async(req,res,next)=>{
    try{
        const StaffType = await StaffTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = StaffType
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

const deleteStaffType = async(req,res,next)=>{
    try{
        const StaffType = await StaffTypeModel.findByIdAndDelete(req.params.id);
        res.data = StaffType
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

module.exports = {getStaffType, getStaffTypeById, addStaffType, updateStaffType, deleteStaffType}
