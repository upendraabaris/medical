const StateModel = require("../models/stateModel")

const getState = async(req,res,next)=>{
    try{
        const State = await StateModel.find().populate('country_id').exec();
        res.data = State
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

const getStateById = async(req,res,next)=>{
    try{
        const State = await StateModel.findById(req.params.id).populate('country_id').exec();
        res.data = State
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

const addState = async(req,res,next)=>{
    try{
        const State = await StateModel.create(req.body);
        res.data = State
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

const updateState = async(req,res,next)=>{
    try{
        const State = await StateModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = State
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

const deleteState = async(req,res,next)=>{
    try{
        const State = await StateModel.findByIdAndDelete(req.params.id);
        res.data = State
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

module.exports = {getState, getStateById, addState, updateState, deleteState}