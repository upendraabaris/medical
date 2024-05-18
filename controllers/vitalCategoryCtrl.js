const VitalCategoryModel = require("../models/vitalCategoryModel")
const Client = require("../middleware/redis")
const getVitalCategory = async(req,res,next)=>{
    try{
        let client = await Client.get('VitalCategory:getVitalCategory');
        let VitalCategory;
        if(client == null) {
            VitalCategory = await VitalCategoryModel.find();
            await Client.set('VitalCategory:getVitalCategory', JSON.stringify(VitalCategory));
        }
        else {
            VitalCategory = JSON.parse(client);
        }
        // const VitalCategory = await VitalCategoryModel.find()
        res.data = VitalCategory
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

const getVitalCategoryById = async(req,res,next)=>{
    try{
        const VitalCategory = await VitalCategoryModel.findById(req.params.id);
        res.data = VitalCategory
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

const addVitalCategory = async(req,res,next)=>{
    try{
        // console.log(req.body);
        // const VitalCategory = await VitalCategoryModel.create(req.body);
        const VitalCategory = await VitalCategoryModel.create(req.body);
        let allKeys = await Client.keys("VitalCategory:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = VitalCategory
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

const updateVitalCategory = async(req,res,next)=>{
    try{
        const VitalCategory = await VitalCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("VitalCategory:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = VitalCategory
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

const deleteVitalCategory = async(req,res,next)=>{
    try{
        const VitalCategory = await VitalCategoryModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("VitalCategory:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = VitalCategory
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

const deleteAllVitalCategory = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletedVitalCategory = await VitalCategoryModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletedVitalCategory;
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

module.exports = {getVitalCategory, getVitalCategoryById, addVitalCategory, updateVitalCategory, deleteVitalCategory, deleteAllVitalCategory}
