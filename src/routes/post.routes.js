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










module.exports = postRouter;