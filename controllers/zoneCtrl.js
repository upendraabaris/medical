const ZoneModel = require("../models/zoneModel")
const Client = require("../middleware/redis")
const getZone = async(req,res,next)=>{
    try{
        // const Zone = await ZoneModel.find().populate('cities').exec();
        let client = await Client.get('zone:getZone');
        let Zone;
        if(client == null) {
            Zone = await ZoneModel.find().populate('cities').exec();
            await Client.set('zone:getZone', JSON.stringify(Zone));
        }
        else {
            Zone = JSON.parse(client);
        }
        res.data = Zone
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

const getZoneById = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findById(req.params.id).populate('cities').exec();
        res.data = Zone
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

const addZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.create(req.body);
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Zone
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

const updateZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Zone
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

const deleteZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = Zone
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

const deleteAllZone = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteZone = await ZoneModel.deleteMany({_id: { $in: idToDelete}});
        let allKeys = await Client.keys("zone:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = deleteZone;
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

module.exports = {getZone, getZoneById, addZone, updateZone, deleteZone, deleteAllZone}