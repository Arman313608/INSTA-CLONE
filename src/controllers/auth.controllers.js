const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");









async function registerControllers(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists" + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }


    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    }) 


    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET, {expiresIn: "1d"})


    res.cookie("token", token);

    res.status(201).json({
        message: "User Register Successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
            password: hash,
        }
    })



}



async function loginControllers(req,res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                email: email
            },
            {
                username: username
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordValid = hash == user.password;


    if(!isPasswordValid){
        return res.status(401).json({
            message: "Password Invalid"
        })
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET, {expiresIn : "1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged In Successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}




module.exports = {
    registerControllers,
    loginControllers
}
