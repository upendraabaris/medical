const Comment = require("../../models/posts/commentModel");
const Post = require("../../models/posts/postModel");
// const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const createComment = (async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.body.post_id, isDelete: false });
        if(post == null) {
            res.json({
                response: {
                    status: "404",
                    message: "Post is already deleted!"
                }
            });
        }
        else {
        const comment = await Comment.create({ post_id: req.body.post_id, parent_id: req.body.parent_id, user_id: req.user._id, desc: req.body.desc });
        res.json({
            response: {
                status: "200",
                message: "success"
            },
            data: comment
        })
    }
    }
    catch(error) {
        throw new Error(error);
    };
});

const updateComment = (async (req, res) => {
 
    try {
        const post = await Post.findOne({ _id: req.body.post_id, isDelete: false });
        const comment = await Comment.findOne({ _id: req.params.id, user_id: req.user._id });
        if(post == null || comment == null) {
            res.json({
                response: {
                    status: "401",
                    message: "You are not Authorize!"
                }
            })
        }
        else {
            req.body.parent_id = undefined;
            req.body.isEdit = true;
            let comm = await Comment.findByIdAndUpdate(comment._id, req.body, {  new: true });
            res.json({
                response: {
                    status: "201",
                    message: "success"
                },
                data: comm
            })
        }
    }
    catch(error)  {
        throw new Error(error);
    }
});

const getComment = (async (req, res) => {
    try {
        console.log(req.params.count);
        const comment = await Comment.aggregate([
            {
                $match: {
                    post_id: new mongoose.Types.ObjectId(req.params.id),
                    parent_id: null,
                    isDelete: false,
                }
            },
            {
                $skip: Number(req.params.count) * Number(req.params.page)
            },
            {
                $limit: Number(req.params.count)
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user_id"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    let: { id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$$id", "$parent_id"] },
                                        { $eq: ["$isDelete", false] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "childComment"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    main_Desc: { $first: "$desc" },
                    user_firstname: { $first: { $first: "$user_id.firstname" } },
                    user_lastname: { $first: { $first: "$user_id.lastname" } },
                    subComm: { $push: {$first: "$childComment"} }
                }
            },
            {
                $project: {
                    _id: "$_id",
                    main_Desc: "$mainDesc",
                    user_firstname: "$user_firstname",
                    user_lastname: "$user_lastname",
                    subComm: { $size: "$subComm" }
                }
            }
        ]);
        res.json({
            response: {
                status: "200",
                message: "success"
            },
            data: comment
        })
    }
    catch(error) {
        throw new Error(error);
    }
});

const childComment = (async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId, isDelete: false });
        const comment = await Comment.findOne({ _id: req.params.commentId, isDelete: false });
        if(post == null || comment == null) {
            res.json({
                response: {
                    status: "404",
                    message: "Post/Comment not found/deleted."
                },
                data: comment
            });
        }
        else {
            const comment = await Comment.aggregate([
                {
                    $match: {
                        post_id: new mongoose.Types.ObjectId(req.params.postId),
                        parent_id: new mongoose.Types.ObjectId(req.params.commentId),
                        isDelete: false,
                    }
                },
                {
                    $skip: Number(req.params.count) * Number(req.params.page)
                },
                {
                    $limit: Number(req.params.count)
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user_id"
                    }
                },
                {
                    $lookup: {
                        from: "comments",
                        let: { id: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$$id", "$parent_id"] },
                                            { $eq: ["$isDelete", false] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "childComment"
                    }
                },
                {
                    $project: {
                        _id: "$_id",
                        main_Desc:  "$desc",
                        subComm: { $size: "$childComment" },
                        user_firstname: { $first: "$user_id.firstname" },
                        user_lastname: { $first: "$user_id.lastname" }
                    }
                },
            ]);
            res.json({
                response: {
                    status: "200",
                    message: "success"
                },
                data: comment
            });                
        }
    }
    catch(error) {
        throw new Error(error);
    }
});

const deleteComment = (async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id, user_id: req.user._id });
        if(comment == null) {
            res.json({
                response: {
                    status: "401",
                    message: "You are not authorize!"
                },
                data: comment
            });
        }
        else {
            comment.isDelete = true;
            await comment.save();
            res.json({
                response: {
                    status: "201",
                    message: "Comment deleted Successfully"
                },
            });
        }

    }
    catch(error) {
        throw new Error(error);
    }
});

const commentListByUser = (async (req, res) => {
    try {
        const comment = await Comment.aggregate([
            {
                $match: {
                    user_id: new mongoose.Types.ObjectId(req.user._id),
                    isDelete: false
                }
            },
            {
                $lookup: {
                    from: "posts",
                    let: { id: "$post_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$$id", "$_id"] },
                                        { $eq: ["$isDelete", false] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "post_id"
                }
            },
            {
                from: "comments",
                let: { id: "$post_id", parent_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$parent_id", "$parent_id"] },
                                    { $eq: ["$$id", "$post_id"] },
                                    { $eq: ["$isDelete", false] }
                                ]
                            }
                        }
                    }
                ],
                as: "comment_id"
            },
            {
                $project: {
                    _id: "$_id",
                    desc: "$desc",
                    post_id: { $first: "$post_id" },
                    childComment: { $size: "$comment_id" }
                }
            }
        ]);
        res.json({
            response: {
                status: "200",
                message: "success"
            },
            data: comment
        });
    }
    catch(error) {
        throw new Error(error);
    }
})

const commentListByUserIdByAdmin = (async (req, res) => {
    try {
        const comment = await Comment.aggregate([
            {
                $match: {
                    user_id: new mongoose.Types.ObjectId(req.user._id),
                    isDelete: false
                }
            },
            {
                $lookup: {
                    from: "posts",
                    let: { id: "$post_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$$id", "$_id"] },
                                        { $eq: ["$isDelete", false] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "post_id"
                }
            },
            {
                from: "comments",
                let: { id: "$post_id", parent_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$parent_id", "$parent_id"] },
                                    { $eq: ["$$id", "$post_id"] },
                                    { $eq: ["$isDelete", false] }
                                ]
                            }
                        }
                    }
                ],
                as: "comment_id"
            },
            {
                $project: {
                    _id: "$_id",
                    desc: "$desc",
                    post_id: { $first: "$post_id" },
                    childComment: { $size: "$comment_id" }
                }
            }
        ]);
        res.json({
            response: {
                status: "200",
                message: "success"
            },
            data: comment
        });
    }
    catch(error) {
        throw new Error(error);
    }
})

module.exports = {
    createComment,
    updateComment,
    getComment,
    childComment,
    commentListByUser,
    commentListByUserIdByAdmin,
}