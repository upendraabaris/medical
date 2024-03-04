const UserInsuranceModel = require("../../models/user/userInsuranceModel")

const getUserInsurance = async(req,res,next)=>{
    try{
        const UserInsurance = await UserInsuranceModel.find();
        res.data = UserInsurance
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

const getUserInsuranceById = async(req,res,next)=>{
    try{
        const UserInsurance = await UserInsuranceModel.findById(req.params.id);
        res.data = UserInsurance
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

const addUserInsurance = async(req,res,next)=>{
    try{
        console.log(req.body);
        const UserInsurance = await UserInsuranceModel.create(req.body);
        res.data = UserInsurance
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

const updateUserInsurance = async(req,res,next)=>{
    try{
        const UserInsurance = await UserInsuranceModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = UserInsurance
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

const deleteUserInsurance = async(req,res,next)=>{
    try{
        const UserInsurance = await UserInsuranceModel.findByIdAndDelete(req.params.id);
        res.data = UserInsurance
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

module.exports = {getUserInsurance, getUserInsuranceById, addUserInsurance, updateUserInsurance, deleteUserInsurance}
