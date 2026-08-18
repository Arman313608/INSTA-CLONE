const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");


async function followUserControllers(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "You can not follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message: `${followeeUsername}, you are trying to follow does not exist.`
            // message: `User you are trying to follow does not exist.`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        followee: followeeUsername,
        follower: followerUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })

}


async function unfollowUserControllers(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })



}


async function acceptFollowRequestControllers(req,res){

    const followersUsername = req.params.username
    const followeeUsername = req.user.username

    const followRequest = await followModel.findOne({
        followee: followeeUsername,
        follower: followersUsername,
        status: "Pending"
    })

    if(!followRequest){
        return res.status(404).json({
            message: "Follow Request Not Found."
        })
    }

    followRequest.status = "Accepted"

    await followRequest.save()

    res.status(200).json({
        message: ` Follow request sent to ${followeeUsername} `,
        follow: followRequest
    })




}

async function rejectFollowRequestControllers(req,res){
    
    const followersUsername = req.params.username
    const followeeUsername = req.user.username

    const followRequest = await followModel.findOne({
        followee: followeeUsername,
        follower: followersUsername,
        status: "Pending"
    })

    if(!followRequest){
        return res.status(404).json({
            message: "Follow Request Not Found."
        })
    }

    followRequest.status = "Rejected"

    await followRequest.save()

    res.status(200).json({
        message: ` Follow request sent to ${followeeUsername} `,
        follow: followRequest
    })


}







module.exports = {
    followUserControllers,
    unfollowUserControllers,
    acceptFollowRequestControllers,
    rejectFollowRequestControllers
}