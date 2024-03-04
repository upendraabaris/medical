const OrderModel = require("../../models/order/orderModel")

const getOrder = async(req,res,next)=>{
    try{
        const Order = await OrderModel.find();
        res.data = Order
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

const getOrderById = async(req,res,next)=>{
    try{
        const Order = await OrderModel.findById(req.params.id);
        res.data = Order
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

const addOrder = async(req,res,next)=>{
    try{
        const Order = await OrderModel.create(req.body);
        res.data = Order
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

const updateOrder = async(req,res,next)=>{
    try{
        const Order = await OrderModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Order
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

const deleteOrder = async(req,res,next)=>{
    try{
        const Order = await OrderModel.findByIdAndDelete(req.params.id);
        res.data = Order
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

module.exports = {getOrder, getOrderById, addOrder, updateOrder, deleteOrder}
