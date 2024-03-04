const OrderResponseModel = require("../../models/order/orderResponseModel")

const getOrderResponse = async(req,res,next)=>{
    try{
        const OrderResponse = await OrderResponseModel.find();
        res.data = OrderResponse
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

const getOrderResponseById = async(req,res,next)=>{
    try{
        const OrderResponse = await OrderResponseModel.findById(req.params.id);
        res.data = OrderResponse
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

const addOrderResponse = async(req,res,next)=>{
    try{
        const OrderResponse = await OrderResponseModel.create(req.body);
        res.data = OrderResponse
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

const updateOrderResponse = async(req,res,next)=>{
    try{
        const OrderResponse = await OrderResponseModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = OrderResponse
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

const deleteOrderResponse = async(req,res,next)=>{
    try{
        const OrderResponse = await OrderResponseModel.findByIdAndDelete(req.params.id);
        res.data = OrderResponse
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

module.exports = {getOrderResponse, getOrderResponseById, addOrderResponse, updateOrderResponse, deleteOrderResponse}
