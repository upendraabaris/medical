const RegionModel = require("../models/regionModel")
const Client = require("../middleware/redis")
const getRegion = async(req,res,next)=>{
    try{
        let client = await Client.get('region:getRegion');
        let Region;
        if(client == null) {
            Region = await RegionModel.find().sort({regionname: 1});
            await Client.set('region:getRegion', JSON.stringify(Region));
        }
        else {
            Region = JSON.parse(client);
        }
        // const Region = await RegionModel.find()
        res.data = Region
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

const getRegionById = async(req,res,next)=>{
    try{
        const Region = await RegionModel.findById(req.params.id);
        res.data = Region
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

const addRegion = async(req,res,next)=>{
    try{
        // console.log(req.body);
        // const Region = await RegionModel.create(req.body);
        const Region = await RegionModel.create(req.body);
        let allKeys = await Client.keys("region:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Region
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

const updateRegion = async(req,res,next)=>{
    try{
        const Region = await RegionModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("region:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Region
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

const deleteRegion = async(req,res,next)=>{
    try{
        const Region = await RegionModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("region:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Region
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

const deleteAllRegion = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletedRegion = await RegionModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletedRegion;
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

module.exports = {getRegion, getRegionById, addRegion, updateRegion, deleteRegion, deleteAllRegion}
