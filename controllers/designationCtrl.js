const DesignationModel = require("../models/designationModel")

const getDesignation = async(req,res,next)=>{
    try{
        // let client = await Client.get('Designation');
        // let Designation;
        // if(client == null) {
        //     Designation = await DesignationModel.find()
        //     await Client.set(`Designation`, JSON.stringify(Designation));
        // }
        // else {
        //     Designation = JSON.parse(client);
        // }
        const Designation = await DesignationModel.find()
        res.data = Designation
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

const getDesignationById = async(req,res,next)=>{
    try{
        const Designation = await DesignationModel.findById(req.params.id);
        res.data = Designation
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

const addDesignation = async(req,res,next)=>{
    try{
        const Designation = await DesignationModel.create(req.body);
        res.data = Designation
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

const updateDesignation = async(req,res,next)=>{
    try{
        const Designation = await DesignationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Designation
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

const deleteDesignation = async(req,res,next)=>{
    try{
        const Designation = await DesignationModel.findByIdAndDelete(req.params.id);
        res.data = Designation
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

module.exports = {getDesignation, getDesignationById, addDesignation, updateDesignation, deleteDesignation}
