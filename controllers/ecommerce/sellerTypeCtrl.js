const SellerTypeModel = require("../../models/ecommerce/sellerTypeModel")

const getSellerType = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.find().sort({seller_type: 1});
        res.data = sellertype
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

const getSellerTypeByCategory = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.find({category:"Individual"}).sort({seller_type: 1});
        res.data = sellertype
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

const getSellerTypeByInstitution = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.find({category:"Institution"}).sort({seller_type: 1});
        res.data = sellertype
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

const getSellerTypeById = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.findById(req.params.id);
        res.data = sellertype
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

const addSellerType = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.create(req.body);
        res.data = sellertype
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

const updateSellerType = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = sellertype
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

const deleteSellerType = async(req,res,next)=>{
    try{
        const sellertype = await SellerTypeModel.findByIdAndDelete(req.params.id);
        res.data = sellertype
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

const pagination = async(req, res, next) =>{
    try{
      const sellertype = await SellerTypeModel.aggregate([
        {
          $skip: req.params.page * req.params.count
        },
        {
          $limit: Number(req.params.count)
        }
      ])
      res.data = sellertype
      res.status_Code = "200"
      next()
    }
    catch(error){
          res.error = true;
          res.status_Code = "403";
          res.message = error.message
          res.data = {}
          next()
    }
  }


  

module.exports = {getSellerType, getSellerTypeById, addSellerType, updateSellerType, deleteSellerType, pagination, getSellerTypeByCategory, getSellerTypeByInstitution}
