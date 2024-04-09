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

const getZoneCityMapping = async(req,res,next)=>{
    try{
        // const City = await CityModel.find().populate('state_id').exec();
        const City = await ZoneModel.aggregate([
            {
                $lookup:{
                    from: "cities",
                    localField: "cities",//kya krna h
                    foreignField: "_id",
                    as: "cityinfo"
                }
            },
            {
                    $unwind:"$cityinfo"
            },
            {
                $lookup: {
                    from: "states",
                    localField: "cityinfo.state_id",
                    foreignField: "_id", // Assuming _id is the ObjectId field in State model
                    as: "stateInfo"
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "stateInfo.country_id",
                    foreignField: "_id", // Assuming _id is the ObjectId field in State model
                    as: "countryInfo"
                }
            },
            {
                $project:{
                    _id:0,
                    name:1,
                    "city_name": "$cityinfo.city_name",
                    // "state_id": "$cityinfo.state_id",
                    stateName: { $arrayElemAt: ["$stateInfo.state_name", 0] },
                    // "country_id": "$stateInfo.country_id",
                    countryName: { $arrayElemAt: ["$countryInfo.country_name", 0] }
                }
            }
        ]);
        res.data = City
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


module.exports = {getZone, getZoneById, addZone, updateZone, deleteZone, deleteAllZone, getZoneCityMapping}