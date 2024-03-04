const MediaModel = require("../../models/media/mediaModel")

const getMedia = async(req,res,next)=>{
    try{
        const Media = await MediaModel.find();
        res.data = Media
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

const getMediaById = async(req,res,next)=>{
    try{
        const Media = await MediaModel.findById(req.params.id);
        res.data = Media
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

const addMedia = async(req,res,next)=>{
    try{
        const Media = await MediaModel.create(req.body);
        res.data = Media
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

const updateMedia = async(req,res,next)=>{
    try{
        const Media = await MediaModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Media
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

const deleteMedia = async(req,res,next)=>{
    try{
        const Media = await MediaModel.findByIdAndDelete(req.params.id);
        res.data = Media
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

module.exports = {getMedia, getMediaById, addMedia, updateMedia, deleteMedia}
