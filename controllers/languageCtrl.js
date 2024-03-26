const LanguageModel = require("../models/languageModel")
const Client = require("../middleware/redis")
const getLanguage = async(req,res,next)=>{
    try{
        // let client = await Client.get('Language');
        // let Language;
        // if(client == null) {
        //     Language = await LanguageModel.find()
        //     await Client.set(`Language`, JSON.stringify(Language));
        // }
        // else {
        //     Language = JSON.parse(client);
        // }
        const Language = await LanguageModel.find()
        res.data = Language
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

const getLanguageById = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.findById(req.params.id);
        res.data = Language
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

const addLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.create(req.body);
        res.data = Language
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

const updateLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Language
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

const deleteLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.findByIdAndDelete(req.params.id);
        res.data = Language
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

module.exports = {getLanguage, getLanguageById, addLanguage, updateLanguage, deleteLanguage}
