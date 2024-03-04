const OrderResponseTypeModel = require("../../models/order/orderResponseType")

const getOrderResponseType = async(req,res,next)=>{
    try{
        const OrderResponseType = await OrderResponseTypeModel.find();
        res.data = OrderResponseType
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

const getOrderResponseTypeById = async(req,res,next)=>{
    try{
        const OrderResponseType = await OrderResponseTypeModel.findById(req.params.id);
        res.data = OrderResponseType
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

const addOrderResponseType = async(req,res,next)=>{
    try{
        const OrderResponseType = await OrderResponseTypeModel.create(req.body);
        res.data = OrderResponseType
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

const updateOrderResponseType = async(req,res,next)=>{
    try{
        const OrderResponseType = await OrderResponseTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = OrderResponseType
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

const deleteOrderResponseType = async(req,res,next)=>{
    try{
        const OrderResponseType = await OrderResponseTypeModel.findByIdAndDelete(req.params.id);
        res.data = OrderResponseType
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

module.exports = {getOrderResponseType, getOrderResponseTypeById, addOrderResponseType, updateOrderResponseType, deleteOrderResponseType}
