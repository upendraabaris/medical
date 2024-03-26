const Currency = require("../models/currencyModel")
const Client = require("../middleware/redis")
const getCurrency = async(req,res,next)=>{
    try{
        // let client = await Client.get('currency');
        // let currency;
        // if(client == null) {
        //     currency = await Currency.find()
        //     await Client.set(`currency`, JSON.stringify(currency));
        // }
        // else {
        //     currency = JSON.parse(client);
        // }
        const currency = await Currency.find()
        res.data = currency
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

const getCurrencyById = async(req,res,next)=>{
    try{
        const currency = await Currency.findById(req.params.id);
        res.data = currency
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

const addCurrency = async(req,res,next)=>{
    try{
        const currency = await Currency.create(req.body);
        res.data = currency
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

const updateCurrency = async(req,res,next)=>{
    try{
        const currency = await Currency.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = currency
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

const deleteCurrency = async(req,res,next)=>{
    try{
        const currency = await Currency.findByIdAndDelete(req.params.id);
        res.data = currency
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

module.exports = {getCurrency, getCurrencyById, addCurrency, updateCurrency, deleteCurrency}