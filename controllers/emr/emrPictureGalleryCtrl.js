const EmrPictureGalleryModel = require("../../models/emr/emrPictureGalleryModel")

const getEmrPictureGallery = async(req,res,next)=>{
    try{
        const EmrPictureGallery = await EmrPictureGalleryModel.find();
        res.data = EmrPictureGallery
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

const getEmrPictureGalleryById = async(req,res,next)=>{
    try{
        const EmrPictureGallery = await EmrPictureGalleryModel.findById(req.params.id);
        res.data = EmrPictureGallery
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

const addEmrPictureGallery = async(req,res,next)=>{
    try{
        const EmrPictureGallery = await EmrPictureGalleryModel.create(req.body);
        res.data = EmrPictureGallery
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

const updateEmrPictureGallery = async(req,res,next)=>{
    try{
        const EmrPictureGallery = await EmrPictureGalleryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EmrPictureGallery
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

const deleteEmrPictureGallery = async(req,res,next)=>{
    try{
        const EmrPictureGallery = await EmrPictureGalleryModel.findByIdAndDelete(req.params.id);
        res.data = EmrPictureGallery
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

module.exports = {getEmrPictureGallery, getEmrPictureGalleryById, addEmrPictureGallery, updateEmrPictureGallery, deleteEmrPictureGallery}
