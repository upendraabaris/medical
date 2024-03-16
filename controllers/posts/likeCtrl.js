// const asyncHandler = require("express-async-handler");

const Like = require("../../models/posts/likeModel");

const createLike = (async (req, res) => {
    try {
        req.body.userid = req.user._id;
        const userLike = await Like.findOne({ post_id: req.body.post, user_id: req.body.userid });
        if(userLike == null) {
            let user = await Like.create({ post_id: req.body.post, user_id: req.body.userid });
            let likeList = await Like.find({ post_id: req.body.post });
            res.json({
                response: {
                    status: "201",
                    message: "Post Liked Successfully"
                },
                data: {
                    likeLength: likeList.length
                }
            });
        }   
        else {
            let user = await Like.findByIdAndDelete(userLike._id);
            let likeList = await Like.find({ post_id: req.body.post });
            res.json({
                response: {
                    status: "202",
                    message: "Post Disliked Successfully"
                },
                data: {
                    likeLength: likeList.length
                }
            });
        }
    }
    catch(error) {
        throw new Error(error);
    }
});

module.exports = {
    createLike
}