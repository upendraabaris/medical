const FinanceModel = require("../models/financeModel")
const Client = require("../middleware/redis")
const getFinance = async(req,res,next)=>{
    try{
        // let client = await Client.get('Finance');
        // let Finance;
        // if(client == null) {
        //     Finance = await FinanceModel.find()
        //     await Client.set(`Finance`, JSON.stringify(Finance));
        // }
        // else {
        //     Finance = JSON.parse(client);
        // }
        const Finance = await FinanceModel.find()
        res.data = Finance
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

const getFinanceById = async(req,res,next)=>{
    try{
        const Finance = await FinanceModel.findById(req.params.id);
        res.data = Finance
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

const addFinance = async(req,res,next)=>{
    try{
        const Finance = await FinanceModel.create(req.body);
        res.data = Finance
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

const updateFinance = async(req,res,next)=>{
    try{
        const Finance = await FinanceModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Finance
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

const deleteFinance = async(req,res,next)=>{
    try{
        const Finance = await FinanceModel.findByIdAndDelete(req.params.id);
        res.data = Finance
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

module.exports = {getFinance, getFinanceById, addFinance, updateFinance, deleteFinance}
