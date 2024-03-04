const MediaTypeModel = require("../../models/media/mediaTypeModel")

const getMediaType = async(req,res,next)=>{
    try{
        const MediaType = await MediaTypeModel.find();
        res.data = MediaType
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

const getMediaTypeById = async(req,res,next)=>{
    try{
        const MediaType = await MediaTypeModel.findById(req.params.id);
        res.data = MediaType
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

const addMediaType = async(req,res,next)=>{
    try{
        const MediaType = await MediaTypeModel.create(req.body);
        res.data = MediaType
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

const updateMediaType = async(req,res,next)=>{
    try{
        const MediaType = await MediaTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = MediaType
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

const deleteMediaType = async(req,res,next)=>{
    try{
        const MediaType = await MediaTypeModel.findByIdAndDelete(req.params.id);
        res.data = MediaType
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

module.exports = {getMediaType, getMediaTypeById, addMediaType, updateMediaType, deleteMediaType}
