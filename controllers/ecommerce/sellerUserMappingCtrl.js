const SellerUserMappingModel = require("../../models/ecommerce/sellerUserMapping")

const getSellerUserMapping = async(req,res,next)=>{
    try{
        const seller_user_id = req.params.id
        const SellerUserMapping = await SellerUserMappingModel.findOne({seller_user_id:seller_user_id});
        res.data = SellerUserMapping
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

const getSellerUserMappingById = async(req,res,next)=>{
    try{
        const SellerUserMapping = await SellerUserMappingModel.findById(req.params.id);
        res.data = SellerUserMapping
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

const addSellerUserMapping = async(req,res,next)=>{
    try{
        const seller_user_id = req.body.seller_user_id
        let SellerUserMapping = await SellerUserMappingModel.findOne({seller_user_id:seller_user_id});
        if(SellerUserMapping){
            SellerUserMapping = await SellerUserMappingModel.findByIdAndUpdate(SellerUserMapping._id, req.body);
        }
        else{
            SellerUserMapping = await SellerUserMappingModel.create(req.body);
        }
        console.log(SellerUserMapping)
        res.data = SellerUserMapping
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

const updateSellerUserMapping = async(req,res,next)=>{
    try{
        const SellerUserMapping = await SellerUserMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SellerUserMapping
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

const deleteSellerUserMapping = async(req,res,next)=>{
    try{
        const SellerUserMapping = await SellerUserMappingModel.findByIdAndDelete(req.params.id);
        res.data = SellerUserMapping
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
      const SellerUserMapping = await SellerUserMappingModel.aggregate([
        {
          $skip: req.params.page * req.params.count
        },
        {
          $limit: Number(req.params.count)
        }
      ])
      res.data = SellerUserMapping
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

module.exports = {getSellerUserMapping, getSellerUserMappingById, addSellerUserMapping, updateSellerUserMapping, deleteSellerUserMapping, pagination}
