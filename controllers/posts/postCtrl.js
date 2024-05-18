// const asyncHandler = require("express-async-handler");
const Post = require("../../models/posts/postModel");
// const cloudinary = require("../../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");

// const createPost = (async (req, res) => {
//     try {
//         let images = [];
//         req.files?.forEach((file) => {
//           images.push(
//             cloudinary.cloudinaryUploadImg(__dirname + "/uploads/" + file.filename)
//           );
//         });
//         Promise.all(images).then(async (result) => {
//             const post = await Post.create({
//                 description: req.body.description,
//                 subject: req.body.subject,
//                 user_id: req.user._id,
//                 images: result
//             });    
//             res.json({
//                 response: {
//                     status: "200",
//                     message: "success"
//                 },
//                 data: post
//             });
//         }).catch((error) => {
//             console.log(error);
//         });
//     }
//     catch(error) {
//         throw new Error(error);
//     }
// });

// const updatePost = (async (req, res) => {
//     try {
//         let post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
//         if(post == null) {
//             res.json({
//                 response: {
//                     status: "401",
//                     message: "You are not Authorize!"
//                 },
//             })
//         }
//         let images = [];
//         req.files?.forEach((file) => {
//           images.push(
//             cloudinary.cloudinaryUploadImg(__dirname + "/uploads/" + file.filename)
//           );
//         });
//         Promise.all(images).then(async (result) => {
//             let images = req.body?.images;
//             result?.forEach((img) => {
//                 images.push(img);
//             });
//             const post = await Post.findByIdAndUpdate(
//                 req.params.id,{
                
//                 description: req.body.description,
//                 images: images
//             });    
//             res.json({
//                 response: {
//                     status: "200",
//                     message: "success"
//                 },
//                 data: post
//             });
//         }).catch((error) => {
//             throw new Error(error)
//         });
//     }
//     catch(error) {
//         throw new Error(error);
//     };
// });

// const deletePostByUser = (async (req, res) => {
//     try {
//         const post = await Post.findOne({ user_id: req.user._id, _id: req.params.id });
//         if(post == null) {
//             res.json({
//                 response: {
//                     status: "401",
//                     message: "You are not Authorize"
//                 }
//             });
//         }
//         else if(post.isDelete) {
//             res.json({
//                 response: {
//                     status: "402",
//                     message: "Post is already Deleted"
//                 }
//             });
//         }
//         else {
//             post.isDelete = true;
//             await post.save();
//             res.json({
//                 response: {
//                     status: "200",
//                     message: "success"
//                 },
//             })
//         }
//     }
//     catch(error) {
//         throw new Error(error);
//     }
// })

const getPostByUser = (async (req, res) => {
    try {
        const postList = await Post.aggregate([
            {
                $match: {
                    user_id: req.user._id,
                    isDelete: false
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post_id",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: "_id",
                    foreignField: "post_id",
                    as: "likes"
                }
            },
            {
                $project: {
                    _id: "$_id",
                    images: "$images",
                    desc: "$desc",
                    commentCount: { "$size": "$comments" },
                    likeCount: { "$size": "$likes" },
                    createdAt: "$createdAt",                    
                }
            }
        ]);
        

        res.json({
            response: {
                status: "200",
                message: "success"
            },
            data: {postList, user: { firsname: req.user.firstname, lastname: req.user.lastname }}
        });
    }
    catch(error)  {
        throw new Error(error);
    }
});

const postListing = (async (req, res) => {
    try {

    }
    catch(error) {
        throw new Error(error);
    }
})

const createPost = async(req,res,next)=>{
    try{
        const post = await Post.create(req.body);
        res.data = post
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


const getPost = async(req,res,next)=>{
    try{
        const post = await Post.find()
        .populate({path:'speciality_id sub_speciality_id post_type_id seller_id', select:'medical_specialty sub_speciality post_type firstname lastname'});
        res.data = post
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

const updatePost = async(req,res,next)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = post
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

const deletePost = async(req,res,next)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        res.data = post
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

const countPostView = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Increment the view count
      post.views = (post.views || 0) + 1;
  
      // Save the updated post
      await post.save();
  
      res.status(200).json({ message: `Post view counted successfully ${post.views}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    createPost,
    updatePost,
    getPostByUser,
    // deletePostByUser,
    getPost,
    deletePost,
    countPostView
}