const UserModel = require("../../models/user/userModel")

const getUser = async(req,res,next)=>{
    try{
        const user = await UserModel.find().populate('user_type_id').populate('nationality').populate('country_of_residence').exec();
        // const user = await UserModel.aggregate([
        //     {
        //         $lookup:{
        //             from: "User",
        //             localField: "user_type_id",
        //             foreignField: "_id",
        //             as:"usertype"
        //         }
        //     }
        // ]);
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

const getUserById = async(req,res,next)=>{
    try{
        const user = await UserModel.findById(req.params.id).populate('user_type_id').populate('nationality').populate('country_of_residence').exec();
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

const addUser = async(req,res,next)=>{
    try{
        console.log(req.body);
        const user = await UserModel.create(req.body);
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

const updateUser = async(req,res,next)=>{
    try{
        const user = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
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

const deleteUser = async(req,res,next)=>{
    try{
        const user = await UserModel.findByIdAndDelete(req.params.id);
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

module.exports = {getUser, getUserById, addUser, updateUser, deleteUser}
