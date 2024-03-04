const UserTypeModel = require("../../models/user/userTypeModel")

const getUserType = async(req,res,next)=>{
    try{
        const user = await UserTypeModel.find();
        res.data = user
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

const getUserTypeById = async(req,res,next)=>{
    try{
        const user = await UserTypeModel.findById(req.params.id);
        res.data = user
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

const addUserType = async(req,res,next)=>{
    try{
        const user = await UserTypeModel.create(req.body);
        res.data = user
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

const updateUserType = async(req,res,next)=>{
    try{
        const user = await UserTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = user
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

const deleteUserType = async(req,res,next)=>{
    try{
        const user = await UserTypeModel.findByIdAndDelete(req.params.id);
        res.data = user
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

module.exports = {getUserType, getUserTypeById, addUserType, updateUserType, deleteUserType}
