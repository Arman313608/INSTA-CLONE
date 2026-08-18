const express = require("express");
const userControllers = require("../controllers/user.controllers")
const identifyUser = require("../middlewares/auth.middleware")



const userRouter = express.Router()



/**
 * @route POST /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */

userRouter.post("/follow/:username",identifyUser , userControllers.followUserControllers)

/**
 * @route POST /api/users/unfollow/:userId
 * @description Unfollow a user
 * @access Private
 */

userRouter.post("/unfollow/:username", identifyUser, userControllers.unfollowUserControllers)


userRouter.post("/follow/accept/:username", identifyUser, userControllers.acceptFollowRequestControllers)


userRouter.post("/follow/reject/:username", identifyUser, userControllers.rejectFollowRequestControllers)





module.exports = userRouter;