const AddressModel = require("../models/addressModel")
const Client = require("../middleware/redis")
const getAddress = async(req,res,next)=>{
    try{
        // let client = await Client.get('Address');
        // let Address;
        // if(client == null) {
        //     Address = await AddressModel.find()
        //     await Client.set(`Address`, JSON.stringify(Address));
        // }
        // else {
        //     Address = JSON.parse(client);
        // }
        const Address = await AddressModel.find()
        res.data = Address
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

const getAddressById = async(req,res,next)=>{
    try{
        const Address = await AddressModel.findById(req.params.id);
        res.data = Address
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

const addAddress = async(req,res,next)=>{
    try{
        const Address = await AddressModel.create(req.body);
        res.data = Address
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

const updateAddress = async(req,res,next)=>{
    try{
        const Address = await AddressModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Address
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

const deleteAddress = async(req,res,next)=>{
    try{
        const Address = await AddressModel.findByIdAndDelete(req.params.id);
        res.data = Address
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

const deleteAllAddress = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteAddress = await AddressModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteAddress;
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


module.exports = {getAddress, getAddressById, addAddress, updateAddress, deleteAddress, deleteAllAddress}
