const PhotoGalleryModel = require("../../models/ecommerce/sellerPhotoGalleryModel")

const getPhotoGallery = async(req,res,next)=>{
    try{
        // let client = await Client.get('PhotoGallery');
        // let PhotoGallery;
        // if(client == null) {
        //     PhotoGallery = await PhotoGalleryModel.find()
        //     await Client.set(`PhotoGallery`, JSON.stringify(PhotoGallery));
        // }
        // else {
        //     PhotoGallery = JSON.parse(client);
        // }
        const PhotoGallery = await PhotoGalleryModel.find().populate('seller_id');
        res.data = PhotoGallery
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

const getPhotoGalleryById = async(req,res,next)=>{
    try{
        const PhotoGallery = await PhotoGalleryModel.findById({seller_id:req.params.id}).populate({ path: 'seller_id', select: 'firstname lastname' });
        res.data = PhotoGallery
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

const addPhotoGallery = async(req,res,next)=>{
    try{
        const PhotoGallery = await PhotoGalleryModel.create(req.body);
        res.data = PhotoGallery
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

const updatePhotoGallery = async(req,res,next)=>{
    try{
        const PhotoGallery = await PhotoGalleryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PhotoGallery
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

const deletePhotoGallery = async(req,res,next)=>{
    try{
        const PhotoGallery = await PhotoGalleryModel.findByIdAndDelete(req.params.id);
        res.data = PhotoGallery
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

const getPhotoGallerySeller = async(req,res,next)=>{
    try{
        // typeId = req.params.typeId
        // sellerId = req.params.sellerId
        const PhotoGallery = await PhotoGalleryModel.find().populate({ path: 'seller_id', select: 'firstname lastname' })
        res.data = PhotoGallery
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

const getPhotoGalleryBySellerId = async (req, res, next) => {
    try {
        const sellerId = req.params.id; // Assuming the seller ID is passed in the URL parameters
        // console.log(sellerId)
        const photoGalleries = await PhotoGalleryModel.find({ seller_id: sellerId }).populate({ path: 'seller_id', select: 'firstname lastname' });
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

module.exports = {getPhotoGallery, getPhotoGalleryById, addPhotoGallery, updatePhotoGallery, deletePhotoGallery, getPhotoGallerySeller, getPhotoGalleryBySellerId}
