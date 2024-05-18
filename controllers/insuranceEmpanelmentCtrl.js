const InsuranceEmpanelmentModel = require("../models/insuranceEmpanelmentModel")
const Client = require("../middleware/redis")
const getInsuranceEmpanelment = async(req,res,next)=>{
    try{
        // let client = await Client.get('InsuranceEmpanelment');
        // let InsuranceEmpanelment;
        // if(client == null) {
        //     InsuranceEmpanelment = await InsuranceEmpanelmentModel.find()
        //     await Client.set(`InsuranceEmpanelment`, JSON.stringify(InsuranceEmpanelment));
        // }
        // else {
        //     InsuranceEmpanelment = JSON.parse(client);
        // }
        const InsuranceEmpanelment = await InsuranceEmpanelmentModel.find()
        res.data = InsuranceEmpanelment
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

const getInsuranceEmpanelmentById = async(req,res,next)=>{
    try{
        const InsuranceEmpanelment = await InsuranceEmpanelmentModel.findById(req.params.id);
        res.data = InsuranceEmpanelment
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

const addInsuranceEmpanelment = async(req,res,next)=>{
    try{
        const InsuranceEmpanelment = await InsuranceEmpanelmentModel.create(req.body);
        res.data = InsuranceEmpanelment
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

const updateInsuranceEmpanelment = async(req,res,next)=>{
    try{
        const InsuranceEmpanelment = await InsuranceEmpanelmentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = InsuranceEmpanelment
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

const deleteInsuranceEmpanelment = async(req,res,next)=>{
    try{
        const InsuranceEmpanelment = await InsuranceEmpanelmentModel.findByIdAndDelete(req.params.id);
        res.data = InsuranceEmpanelment
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

const deleteAllInsuranceEmpanelment = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteInsuranceEmpanelment = await InsuranceEmpanelmentModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteInsuranceEmpanelment;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}

module.exports = {getInsuranceEmpanelment, getInsuranceEmpanelmentById, addInsuranceEmpanelment, updateInsuranceEmpanelment, deleteInsuranceEmpanelment, deleteAllInsuranceEmpanelment}
