const TherapyModel = require("../models/therapyModel")

const getTherapy = async(req,res,next)=>{
    try{
        // let client = await Client.get('Therapy');
        // let Therapy;
        // if(client == null) {
        //     Therapy = await TherapyModel.find()
        //     await Client.set(`Therapy`, JSON.stringify(Therapy));
        // }
        // else {
        //     Therapy = JSON.parse(client);
        // }
        const Therapy = await TherapyModel.find()
        res.data = Therapy
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

const getTherapyById = async(req,res,next)=>{
    try{
        const Therapy = await TherapyModel.findById(req.params.id);
        res.data = Therapy
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

const addTherapy = async(req,res,next)=>{
    try{
        const Therapy = await TherapyModel.create(req.body);
        res.data = Therapy
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

const updateTherapy = async(req,res,next)=>{
    try{
        const Therapy = await TherapyModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Therapy
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

const deleteTherapy = async(req,res,next)=>{
    try{
        const Therapy = await TherapyModel.findByIdAndDelete(req.params.id);
        res.data = Therapy
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

module.exports = {getTherapy, getTherapyById, addTherapy, updateTherapy, deleteTherapy}
