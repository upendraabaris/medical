const StaffModel = require("../../models/staff/staffModel")
const Client = require("../../middleware/redis")
const getStaff = async(req,res,next)=>{
    try{
        let client = await Client.get('Staff');
        let Staff;
        if(client == null) {
            Staff = await StaffModel.find()
            await Client.set(`Staff`, JSON.stringify(Staff));
        }
        else {
            Staff = JSON.parse(client);
        }
        res.data = Staff
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

const getStaffById = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findById(req.params.id);
        res.data = Staff
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

const addStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.create(req.body);
        res.data = Staff
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

const updateStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Staff
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

const deleteStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findByIdAndDelete(req.params.id);
        res.data = Staff
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

module.exports = {getStaff, getStaffById, addStaff, updateStaff, deleteStaff}
