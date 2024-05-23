const NbsuTherapyModel = require("../models/nbsuTherapiesModel")

const getNbsuTherapy = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbsuTherapy');
        // let NbsuTherapy;
        // if(client == null) {
        //     NbsuTherapy = await NbsuTherapyModel.find()
        //     await Client.set(`NbsuTherapy`, JSON.stringify(NbsuTherapy));
        // }
        // else {
        //     NbsuTherapy = JSON.parse(client);
        // }
        const NbsuTherapy = await NbsuTherapyModel.find()
        res.data = NbsuTherapy
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

const getNbsuTherapyById = async(req,res,next)=>{
    try{
        const NbsuTherapy = await NbsuTherapyModel.findById(req.params.id);
        res.data = NbsuTherapy
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

const addNbsuTherapy = async(req,res,next)=>{
    try{
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbsuTherapy = await NbsuTherapyModel.create(req.body);
        res.data = NbsuTherapy
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

const updateNbsuTherapy = async(req,res,next)=>{
    try{
        const NbsuTherapy = await NbsuTherapyModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuTherapy
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

const deleteNbsuTherapy = async(req,res,next)=>{
    try{
        const NbsuTherapy = await NbsuTherapyModel.findByIdAndDelete(req.params.id);
        res.data = NbsuTherapy
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

module.exports = {getNbsuTherapy, getNbsuTherapyById, addNbsuTherapy, updateNbsuTherapy, deleteNbsuTherapy}
