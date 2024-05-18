const UserRoleModel = require("../../models/user/userRoleModel")

const getUserRole = async(req,res,next)=>{
    try{
        const user = await UserRoleModel.find();
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

const getUserRoleById = async(req,res,next)=>{
    try{
        const user = await UserRoleModel.findById(req.params.id);
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

const addUserRole = async(req,res,next)=>{
    try{
        const user = await UserRoleModel.create(req.body);
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

const updateUserRole = async(req,res,next)=>{
    try{
        const user = await UserRoleModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
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

const deleteUserRole = async(req,res,next)=>{
    try{
        const user = await UserRoleModel.findByIdAndDelete(req.params.id);
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

module.exports = {getUserRole, getUserRoleById, addUserRole, updateUserRole, deleteUserRole}
