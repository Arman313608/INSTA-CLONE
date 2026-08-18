const express = require("express");
const postControllers = require("../controllers/post.controllers");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()})



const postRouter = express.Router();


/**
 *  POST /api/posts [protected]
 * - req.body = {caption, image-file
 */
postRouter.post("/", upload.single("image"),postControllers.createPostControllers)


/**
 * GET /api/posts/ [protected]
 */

postRouter.get("/", postControllers.getPostControllers)


/**
 * GET /api/posts/details/:postId
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from 
 */

postRouter.get("/details/:postId",postControllers.getPostDetailsControllers)








module.exports = postRouter;