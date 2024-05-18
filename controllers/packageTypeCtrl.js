const PackageTypeModel = require("../models/packageTypeModel")
const Client = require("../middleware/redis")
const getPackageType = async(req,res,next)=>{
    try{
        // let client = await Client.get('PackageType');
        // let PackageType;
        // if(client == null) {
        //     PackageType = await PackageTypeModel.find()
        //     await Client.set(`PackageType`, JSON.stringify(PackageType));
        // }
        // else {
        //     PackageType = JSON.parse(client);
        // }
        const PackageType = await PackageTypeModel.find()
        res.data = PackageType
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

const getPackageTypeById = async(req,res,next)=>{
    try{
        const PackageType = await PackageTypeModel.findById(req.params.id);
        res.data = PackageType
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

const addPackageType = async(req,res,next)=>{
    try{
        const PackageType = await PackageTypeModel.create(req.body);
        res.data = PackageType
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

const updatePackageType = async(req,res,next)=>{
    try{
        const PackageType = await PackageTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PackageType
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

const deletePackageType = async(req,res,next)=>{
    try{
        const PackageType = await PackageTypeModel.findByIdAndDelete(req.params.id);
        res.data = PackageType
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

const deleteAllPackageType = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletePackageType = await PackageTypeModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletePackageType;
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

module.exports = {getPackageType, getPackageTypeById, addPackageType, updatePackageType, deletePackageType, deleteAllPackageType}
