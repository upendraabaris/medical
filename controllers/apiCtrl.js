const ApiModel = require("../models/apiModel")
const Client = require("../middleware/redis")
const getApi = async(req,res,next)=>{
    try{
        // let client = await Client.get('Api');
        // let Api;
        // if(client == null) {
        //     Api = await ApiModel.find()
        //     await Client.set(`Api`, JSON.stringify(Api));
        // }
        // else {
        //     Api = JSON.parse(client);
        // }
        const Api = await ApiModel.find()
        res.data = Api
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

const getApiById = async(req,res,next)=>{
    try{
        const Api = await ApiModel.findById(req.params.id);
        res.data = Api
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

const addApi = async(req,res,next)=>{
    try{
        const Api = await ApiModel.create(req.body);
        res.data = Api
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

const updateApi = async(req,res,next)=>{
    try{
        const Api = await ApiModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Api
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

const deleteApi = async(req,res,next)=>{
    try{
        const Api = await ApiModel.findByIdAndDelete(req.params.id);
        res.data = Api
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

const deleteAllApi = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteApi = await ApiModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteApi;
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

module.exports = {getApi, getApiById, addApi, updateApi, deleteApi, deleteAllApi}
