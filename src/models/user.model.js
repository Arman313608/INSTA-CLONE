const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "Username already exists"],
        required:[true, "Useranme is required"]
    },
    email:{
        type:String,
        unique:[true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required:[true, "Password is required"]
    },
    bio: String,
    profileImage:{
        type:String,
        default: "https://ik.imagekit.io/lxmsnwqsa/Default_pfp.jpg?updatedAt=1786408143877"

    }
})



const userModel = mongoose.model("users", userSchema);


module.exports = userModel;