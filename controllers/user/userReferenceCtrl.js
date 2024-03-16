const UserReferenceModel = require("../../models/user/userReferenceModel")

const getUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.find();
        res.data = UserReference
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

const getUserReferenceById = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.findById(req.params.id);
        res.data = UserReference
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

const addUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.create(req.body);
        res.data = UserReference
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

const updateUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = UserReference
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

const deleteUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.findByIdAndDelete(req.params.id);
        res.data = UserReference
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

module.exports = {getUserReference, getUserReferenceById, addUserReference, updateUserReference, deleteUserReference}
