const VideoGalleryModel = require("../../models/ecommerce/sellerVideoGalleryModel")

const getVideoGallery = async(req,res,next)=>{
    try{
        // let client = await Client.get('VideoGallery');
        // let VideoGallery;
        // if(client == null) {
        //     VideoGallery = await VideoGalleryModel.find()
        //     await Client.set(`VideoGallery`, JSON.stringify(VideoGallery));
        // }
        // else {
        //     VideoGallery = JSON.parse(client);
        // }
        const VideoGallery = await VideoGalleryModel.find().populate({ path: 'seller_id', select: 'firstname lastname' })
        res.data = VideoGallery
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

const getVideoGalleryById = async(req,res,next)=>{
    try{
        const VideoGallery = await VideoGalleryModel.findById(req.params.id).populate({ path: 'seller_id', select: 'firstname lastname' });
        res.data = VideoGallery
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

const addVideoGallery = async(req,res,next)=>{
    try{
        const VideoGallery = await VideoGalleryModel.create(req.body);
        res.data = VideoGallery
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

const updateVideoGallery = async(req,res,next)=>{
    try{
        const VideoGallery = await VideoGalleryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = VideoGallery
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

const deleteVideoGallery = async(req,res,next)=>{
    try{
        const VideoGallery = await VideoGalleryModel.findByIdAndDelete(req.params.id);
        res.data = VideoGallery
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

const getVideoGalleryBySellerId = async (req, res, next) => {
    try {
        const sellerId = req.params.id; // Assuming the seller ID is passed in the URL parameters
        // console.log(sellerId)
        const photoGalleries = await VideoGalleryModel.find({ seller_id: sellerId }).populate({ path: 'seller_id', select: 'firstname lastname' });
        res.data = photoGalleries;
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

module.exports = {getVideoGallery, getVideoGalleryById, addVideoGallery, updateVideoGallery, deleteVideoGallery, getVideoGalleryBySellerId}
