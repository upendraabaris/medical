const PackageModel = require("../models/packageModel")
const Client = require("../middleware/redis")
const getPackage = async(req,res,next)=>{
    try{
        // let client = await Client.get('Package');
        // let Package;
        // if(client == null) {
        //     Package = await PackageModel.find()
        //     await Client.set(`Package`, JSON.stringify(Package));
        // }
        // else {
        //     Package = JSON.parse(client);
        // }
        const Package = await PackageModel.find().populate({path: 'packageTypeId', model: 'PackageType', select: 'package_type'})
        .populate({path: 'partnerFacilityId', select: 'firstname lastname'})
        res.data = Package
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


const getPackageByType = async(req,res,next)=>{
    try{
        // let client = await Client.get('Package');
        // let Package;
        // if(client == null) {
        //     Package = await PackageModel.find()
        //     await Client.set(`Package`, JSON.stringify(Package));
        // }
        // else {
        //     Package = JSON.parse(client);
        // }
        const Package = await PackageModel.find({packageTypeId: req.params.id}).populate({path: 'packageTypeId', model: 'PackageType', select: 'package_type'})
        .populate({path: 'partnerFacilityId', select: 'firstname lastname'})
        res.data = Package
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

const getPackageById = async(req,res,next)=>{
    try{
        const Package = await PackageModel.findById(req.params.id);
        res.data = Package
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

const addPackage = async(req,res,next)=>{
    try{
        const Package = await PackageModel.create(req.body);
        res.data = Package
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

const updatePackage = async(req,res,next)=>{
    try{
        const Package = await PackageModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Package
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

const deletePackage = async(req,res,next)=>{
    try{
        const Package = await PackageModel.findByIdAndDelete(req.params.id);
        res.data = Package
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

const deleteAllVitalInformation = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteVitalInfo = await PackageModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteVitalInfo;
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

const getPackageByUserId = async(req,res,next)=>{
    try{
        let id = req.params.id
        console.log(id)
        const Package = await PackageModel.find({user_id:id});
        res.data = Package
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


module.exports = {getPackage, getPackageById, addPackage, updatePackage, deletePackage, deleteAllVitalInformation, getPackageByUserId, getPackageByType}
