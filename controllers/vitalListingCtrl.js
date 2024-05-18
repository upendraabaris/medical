const VitalListingModel = require("../models/vitalListingModel")
const Client = require("../middleware/redis")
const getVitalListing = async(req,res,next)=>{
    try{
        let client = await Client.get('VitalListing:getVitalListing');
        let VitalListing;
        if(client == null) {
            VitalListing = await VitalListingModel.find();
            await Client.set('VitalListing:getVitalListing', JSON.stringify(VitalListing));
        }
        else {
            VitalListing = JSON.parse(client);
        }
        // const VitalListing = await VitalListingModel.find()
        res.data = VitalListing
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

const getVitalListingById = async(req,res,next)=>{
    try{
        const VitalListing = await VitalListingModel.findById(req.params.id);
        res.data = VitalListing
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

const addVitalListing = async(req,res,next)=>{
    try{
        // console.log(req.body);
        // const VitalListing = await VitalListingModel.create(req.body);
        const VitalListing = await VitalListingModel.create(req.body);
        let allKeys = await Client.keys("VitalListing:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = VitalListing
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

const updateVitalListing = async(req,res,next)=>{
    try{
        const VitalListing = await VitalListingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("VitalListing:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = VitalListing
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

const deleteVitalListing = async(req,res,next)=>{
    try{
        const VitalListing = await VitalListingModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("VitalListing:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = VitalListing
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

const deleteAllVitalListing = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletedVitalListing = await VitalListingModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletedVitalListing;
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

module.exports = {getVitalListing, getVitalListingById, addVitalListing, updateVitalListing, deleteVitalListing, deleteAllVitalListing}
