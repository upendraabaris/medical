const IndicationModel = require("../models/indicationModel")
const Client = require("../middleware/redis")
const getIndication = async(req,res,next)=>{
    try{
        const Indication = await IndicationModel.find()
        // let client = await Client.get('IndicationType');
        // let Indication;
        // if(client == null) {
        //     Indication = await IndicationModel.find()
        //     await Client.set("IndicationType", JSON.stringify(Indication));
        // }
        // else {
        //     Indication = JSON.parse(client);
        // }
        res.data = Indication
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

const getIndicationById = async(req,res,next)=>{
    try{
        const Indication = await IndicationModel.findById(req.params.id);
        res.data = Indication
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

const addIndication = async(req,res,next)=>{
    try{
        const Indication = await IndicationModel.create(req.body);
        res.data = Indication
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

const updateIndication = async(req,res,next)=>{
    try{
        const Indication = await IndicationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Indication
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

const deleteIndication = async(req,res,next)=>{
    try{
        const Indication = await IndicationModel.findByIdAndDelete(req.params.id);
        res.data = Indication
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

const deleteAllIndicationType = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteIndicationType = await IndicationModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteIndicationType;
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

module.exports = {getIndication, getIndicationById, addIndication, updateIndication, deleteIndication, deleteAllIndicationType}
