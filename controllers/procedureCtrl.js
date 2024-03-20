const ProcedureModel = require("../models/procedureModel")
const Client = require("../middleware/redis")
const getProcedure = async(req,res,next)=>{
    try{
        let client = await Client.get('Procedure');
        let Procedure;
        if(client == null) {
            Procedure = await ProcedureModel.find()
            await Client.set(`Procedure`, JSON.stringify(Procedure));
        }
        else {
            Procedure = JSON.parse(client);
        }
        res.data = Procedure
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

const getProcedureById = async(req,res,next)=>{
    try{
        const procedure = await ProcedureModel.findById(req.params.id);
        res.data = procedure
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

const addProcedure = async(req,res,next)=>{
    try{
        const procedure = await ProcedureModel.create(req.body);
        res.data = procedure
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

const updateProcedure = async(req,res,next)=>{
    try{
        const procedure = await ProcedureModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = procedure
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

const deleteProcedure = async(req,res,next)=>{
    try{
        const procedure = await ProcedureModel.findByIdAndDelete(req.params.id);
        res.data = procedure
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

module.exports = {getProcedure, getProcedureById, addProcedure, updateProcedure, deleteProcedure}
