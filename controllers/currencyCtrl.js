const Currency = require("../models/currencyModel")
const Client = require("../middleware/redis")
const getCurrency = async(req,res,next)=>{
    try{
        // const currency = await Currency.find()
        let client = await Client.get('currency:getCurrency');
        let currency;
        if(client == null) {
            currency = await Currency.find().populate('country_id')
            await Client.set(`currency:getCurrency`, JSON.stringify(currency));
        }
        else {
            currency = JSON.parse(client);
        }
        res.data = currency
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;a
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}


const getCurrencyByCountryId = async (req, res, next) => {
    try {
        const country_id  = req.params.id; 

        if (!country_id) {
            return res.status(400).json({ error: 'Country ID is required' });
        }

        let client = await Client.get(`currency:getCurrency:${country_id}`);
        let currency;

        if (client == null) {
            currency = await Currency.find({ country_id });
            await Client.set(`currency:getCurrency:${country_id}`, JSON.stringify(currency));
        } else {
            currency = JSON.parse(client);
        }

        res.data = currency;
        res.status_Code = "200";
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = "500";
        res.message = error.message;
        res.data = {};
        next();
    }
};


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
        let allKeys = await Client.keys("currency:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
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
        let allKeys = await Client.keys("currency:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
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
        let allKeys = await Client.keys("currency:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
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

const deleteAllCurrency = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteCurrency = await Currency.deleteMany({_id: { $in: idToDelete}});
        let allKeys = await Client.keys("currency:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = deleteCurrency;
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

module.exports = {getCurrency, getCurrencyById, addCurrency, updateCurrency, deleteCurrency, deleteAllCurrency, getCurrencyByCountryId}