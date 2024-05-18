const OrderTypeModel = require("../../models/ecommerce/orderTypeModel")

const getOrderType= async(req,res,next)=>{
    try{
        const OrderTypetype = await OrderTypeTypeModel.find();
        res.data = OrderTypetype
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

const getOrderTypeById = async(req,res,next)=>{
    try{
        const OrderType = await OrderTypeTypeModel.findById(req.params.id);
        res.data = OrderType
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

const addOrderType = async(req,res,next)=>{
    try{
        const OrderTypetype = await OrderTypeTypeModel.create(req.body);
        res.data = OrderTypetype
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

const updateOrderType = async(req,res,next)=>{
    try{
        const OrderTypetype = await OrderTypeTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = OrderTypetype
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

const deleteOrderType = async(req,res,next)=>{
    try{
        const OrderTypetype = await OrderTypeTypeModel.findByIdAndDelete(req.params.id);
        res.data = OrderTypetype
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
      const OrderTypetype = await OrderTypeTypeModel.aggregate([
        {
          $skip: req.params.page * req.params.count
        },
        {
          $limit: Number(req.params.count)
        }
      ])
      res.data = OrderTypetype
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

module.exports = {getOrderType, getOrderTypeById, addOrderType, updateOrderType, deleteOrderType, pagination}
