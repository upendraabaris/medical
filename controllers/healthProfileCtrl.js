const HealthProfileModel = require("../models/healthProfileModel")
const IButtonModel = require("../models/ibuttonModel")
const Client = require("../middleware/redis")
const getHealthProfile = async(req,res,next)=>{
    try{
        // let client = await Client.get('HealthProfile');
        // let HealthProfile;
        // if(client == null) {
        //     HealthProfile = await HealthProfileModel.find()
        //     await Client.set(`HealthProfile`, JSON.stringify(HealthProfile));
        // }
        // else {
        //     HealthProfile = JSON.parse(client);
        // }
        const HealthProfile = await HealthProfileModel.find()
        res.data = HealthProfile
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

const getHealthProfileById = async(req,res,next)=>{
    try{
        const HealthProfile = await HealthProfileModel.findById(req.params.id);
        res.data = HealthProfile
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

const addHealthProfile = async(req,res,next)=>{
    try{
        req.body.addedBy = req.user
        req.body.user_id = req.body.user_id != null ? req.body.user_id : req.user
        const HealthProfile = await HealthProfileModel.create(req.body);
        res.data = HealthProfile
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

const addHealthProfileByStaff = async(req,res,next)=>{
    try{
        // req.body.addedByStaff = req.user
        req.body.addedBy = req.body.addedBy
        req.body.user_id = req.body.user_id
        const HealthProfile = await HealthProfileModel.create(req.body);
        res.data = HealthProfile
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

const updateHealthProfile = async(req,res,next)=>{
    try{
        const HealthProfile = await HealthProfileModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HealthProfile
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

const deleteHealthProfile = async(req,res,next)=>{
    try{
        const HealthProfile = await HealthProfileModel.findByIdAndDelete(req.params.id);
        res.data = HealthProfile
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

const getHealthProfileByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the user_id is passed as a parameter
        // const healthProfiles = await HealthProfileModel.find({ user_id: userId }).populate('addedBy');
        const healthProfiles = await HealthProfileModel.find({ user_id: userId });
        res.data = healthProfiles;
        res.status_Code = "200";
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}

const addData = async (req, res, next) => {
    try {
        let list = [];
        req.body.list.forEach((item) => {
            let points = [];
            if (Array.isArray(item.points)) {
                points = item.points.map(point => {
                    if (typeof point === 'string') {
                        return { title: point, sub_points: [] }; // If it's a string, create a point object with empty sub_points array
                    } else if (typeof point === 'object' && point.title) {
                        return { title: point.title, sub_points: point.sub_points || [] }; // If it's an object with title and sub_points properties, extract them
                    }
                });
            }
            const healthProfile = new IButtonModel({
                category: item.category,
                title: item.title,
                points: points
            });
            list.push(healthProfile);
        });
        const savedHealthProfiles = await IButtonModel.insertMany(list);
        res.status(201).json({ success: true, data: savedHealthProfiles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {getHealthProfile, getHealthProfileById, addHealthProfile, updateHealthProfile, deleteHealthProfile, getHealthProfileByUserId, addData}
