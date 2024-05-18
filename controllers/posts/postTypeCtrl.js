const PostTypeModel = require("../../models/posts/postTypeModel")

const getPostType = async(req,res,next)=>{
    try{
        const PostType = await PostTypeModel.find();
        res.data = PostType
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

const getPostTypeById = async(req,res,next)=>{
    try{
        const PostType = await PostTypeModel.findById(req.params.id);
        res.data = PostType
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

const addPostType = async(req,res,next)=>{
    try{
        const PostType = await PostTypeModel.create(req.body);
        res.data = PostType
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

const updatePostType = async(req,res,next)=>{
    try{
        const PostType = await PostTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PostType
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

const deletePostType = async(req,res,next)=>{
    try{
        const PostType = await PostTypeModel.findByIdAndDelete(req.params.id);
        res.data = PostType
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

module.exports = {getPostType, getPostTypeById, addPostType, updatePostType, deletePostType}
