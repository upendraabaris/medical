const UserRelationModel = require("../../models/user/userRelationModel")

const getUserRelation = async(req,res,next)=>{
    try{
        const user = await UserRelationModel.find();
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

const getUserRelationById = async(req,res,next)=>{
    try{
        const user = await UserRelationModel.findById(req.params.id);
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

const addUserRelation = async(req,res,next)=>{
    try{
        const user = await UserRelationModel.create(req.body);
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

const updateUserRelation = async(req,res,next)=>{
    try{
        const user = await UserRelationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
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

const deleteUserRelation = async(req,res,next)=>{
    try{
        const user = await UserRelationModel.findByIdAndDelete(req.params.id);
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

module.exports = {getUserRelation, getUserRelationById, addUserRelation, updateUserRelation, deleteUserRelation}
