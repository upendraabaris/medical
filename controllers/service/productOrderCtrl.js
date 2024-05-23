const ProductOrderModel = require("../../models/service/productOrderModel")

const getProductOrder = async(req,res,next)=>{
    try{
        const ProductOrder = await ProductOrderModel.find();
        res.data = ProductOrder
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

const getProductOrderById = async(req,res,next)=>{
    try{
        const ProductOrder = await ProductOrderModel.findById(req.params.id);
        res.data = ProductOrder
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

const addProductOrder = async(req,res,next)=>{
    try{
        const ProductOrder = await ProductOrderModel.create(req.body);
        res.data = ProductOrder
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

const updateProductOrder = async(req,res,next)=>{
    try{
        const ProductOrder = await ProductOrderModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ProductOrder
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

const deleteProductOrder = async(req,res,next)=>{
    try{
        const ProductOrder = await ProductOrderModel.findByIdAndDelete(req.params.id);
        res.data = ProductOrder
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

module.exports = {getProductOrder, getProductOrderById, addProductOrder, updateProductOrder, deleteProductOrder}
