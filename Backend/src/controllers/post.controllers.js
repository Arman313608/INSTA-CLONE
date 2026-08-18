const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");




const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostControllers(req,res){
    console.log(req.body, req.file);
    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post Created Successfully",
        post
    })

    
}


async function getPostControllers(req,res){

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts Fetched Successfully",
        posts
    })

    

}


async function getPostDetailsControllers(req,res){

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post Not Found."
        })
    }

    const isValidUser = post.user.toString() === userId.toString()

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post Details Fetched Successfully ",
        post
    })

}


async function likePostControllers(req,res){

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post Not Found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post like Successfully",
        like
    })


}





module.exports = {
    createPostControllers,
    getPostControllers,
    getPostDetailsControllers,
    likePostControllers
}