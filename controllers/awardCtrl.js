const AwardModel = require("../models/awardModel")
const Client = require("../middleware/redis")
const getAward = async(req,res,next)=>{
    try{
        // let client = await Client.get('Award');
        // let award;
        // if(client == null) {
        //     award = await AwardModel.find().populate('user_id').populate('hos_clinic_id')
        //     await Client.set('Award', JSON.stringify(award));
        // }
        // else {
        //     award = JSON.parse(client);
        // }


        const Award = await AwardModel.find().populate('user_id').populate('hos_clinic_id');
        res.data = Award
        // res.data = award
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

const getAwardById = async(req,res,next)=>{
    try{
        const Award = await AwardModel.findById(req.params.id);
        res.data = Award
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

const addAward = async(req,res,next)=>{
    try{
        const Award = await AwardModel.create(req.body);
        res.data = Award
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

const updateAward = async(req,res,next)=>{
    try{
        const Award = await AwardModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Award
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

const deleteAward = async(req,res,next)=>{
    try{
        const Award = await AwardModel.findByIdAndDelete(req.params.id);
        res.data = Award
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

const deleteAllAward = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteAward = await AwardModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteAward;
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

module.exports = {getAward, getAwardById, addAward, updateAward, deleteAward, deleteAllAward}
