const FavoriteContactModel = require("../models/favoriteContactModel")

const getFavoriteContact = async(req,res,next)=>{
    try{
        const FavoriteContact = await FavoriteContactModel.find();
        res.data = FavoriteContact
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

const getFavoriteContactById = async(req,res,next)=>{
    try{
        const FavoriteContact = await FavoriteContactModel.findById(req.params.id);
        res.data = FavoriteContact
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

const addFavoriteContact = async(req,res,next)=>{
    try{
        const FavoriteContact = await FavoriteContactModel.create(req.body);
        res.data = FavoriteContact
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

const updateFavoriteContact = async(req,res,next)=>{
    try{
        const FavoriteContact = await FavoriteContactModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = FavoriteContact
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

const deleteFavoriteContact = async(req,res,next)=>{
    try{
        const FavoriteContact = await FavoriteContactModel.findByIdAndDelete(req.params.id);
        res.data = FavoriteContact
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

module.exports = {getFavoriteContact, getFavoriteContactById, addFavoriteContact, updateFavoriteContact, deleteFavoriteContact}
