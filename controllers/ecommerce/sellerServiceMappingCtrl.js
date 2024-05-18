const SellerServiceMappingModel = require("../../models/ecommerce/sellerServiceMapping")

const getSellerServiceMapping = async(req,res,next)=>{
    try{
        const SellerServiceMapping = await SellerServiceMappingModel.find();
        res.data = SellerServiceMapping
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

const getSellerServiceMappingById = async(req,res,next)=>{
    try{
        const SellerServiceMapping = await SellerServiceMappingModel.findById(req.params.id);
        res.data = SellerServiceMapping
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

const addSellerServiceMapping = async(req,res,next)=>{
    try{
        const SellerServiceMapping = await SellerServiceMappingModel.create(req.body);
        res.data = SellerServiceMapping
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

const updateSellerServiceMapping = async(req,res,next)=>{
    try{
        const SellerServiceMapping = await SellerServiceMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SellerServiceMapping
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

const deleteSellerServiceMapping = async(req,res,next)=>{
    try{
        const SellerServiceMapping = await SellerServiceMappingModel.findByIdAndDelete(req.params.id);
        res.data = SellerServiceMapping
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
      const SellerServiceMapping = await SellerServiceMappingModel.aggregate([
        {
          $skip: req.params.page * req.params.count
        },
        {
          $limit: Number(req.params.count)
        }
      ])
      res.data = SellerServiceMapping
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

module.exports = {getSellerServiceMapping, getSellerServiceMappingById, addSellerServiceMapping, updateSellerServiceMapping, deleteSellerServiceMapping, pagination}
