const BusinessPartnerModel = require("../models/businessPartnerModel")

const getBusinessPartner = async(req,res,next)=>{
    try{
        const BusinessPartner = await BusinessPartnerModel.find();
        res.data = BusinessPartner
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

const getBusinessPartnerById = async(req,res,next)=>{
    try{
        const BusinessPartner = await BusinessPartnerModel.findById(req.params.id);
        res.data = BusinessPartner
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

const addBusinessPartner = async(req,res,next)=>{
    try{
        const BusinessPartner = await BusinessPartnerModel.create(req.body);
        res.data = BusinessPartner
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

const updateBusinessPartner = async(req,res,next)=>{
    try{
        const BusinessPartner = await BusinessPartnerModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = BusinessPartner
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

const deleteBusinessPartner = async(req,res,next)=>{
    try{
        const BusinessPartner = await BusinessPartnerModel.findByIdAndDelete(req.params.id);
        res.data = BusinessPartner
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

module.exports = {getBusinessPartner, getBusinessPartnerById, addBusinessPartner, updateBusinessPartner, deleteBusinessPartner}
