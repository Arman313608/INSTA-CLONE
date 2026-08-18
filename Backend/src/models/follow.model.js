const mongoose = require("mongoose");



const followSchema = new mongoose.Schema({
    follower:{
        type: String
    },
    followee:{
        type: String
    },

    status:{
        type: String,
        default: "Pending",
        enum: {
            values: ["Pending", "Accepted", "Rejected"],
            message: "Status only can be pending, accepted and rejected"
        }
    }

},{
    timestamps: true
})

followSchema.index({follower: 1, followee: 1}, {unique: true})



const followModel = mongoose.model("follows", followSchema)

module.exports = followModel;