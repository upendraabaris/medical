const OrderStatusModel = require("../../models/order/orderStatusModel")

const getOrderStatus = async(req,res,next)=>{
    try{
        const OrderStatus = await OrderStatusModel.find();
        res.data = OrderStatus
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

const getOrderStatusById = async(req,res,next)=>{
    try{
        const OrderStatus = await OrderStatusModel.findById(req.params.id);
        res.data = OrderStatus
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

const addOrderStatus = async(req,res,next)=>{
    try{
        const OrderStatus = await OrderStatusModel.create(req.body);
        res.data = OrderStatus
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

const updateOrderStatus = async(req,res,next)=>{
    try{
        const OrderStatus = await OrderStatusModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = OrderStatus
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

const deleteOrderStatus = async(req,res,next)=>{
    try{
        const OrderStatus = await OrderStatusModel.findByIdAndDelete(req.params.id);
        res.data = OrderStatus
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

module.exports = {getOrderStatus, getOrderStatusById, addOrderStatus, updateOrderStatus, deleteOrderStatus}
