import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js"

// @desc    Auth user & get token
// @route   POST /users/login
// @access  Public
const authUser = asyncHandler(async (req, res) =>  {
    const {email, password} = await req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
            });
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
});

// @desc    Post Register new user profile
// @route   POST /users
// @access  Pablic
const registerUser = asyncHandler(async (req, res) =>  {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }
    let user = await User.create({name, email, password})
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid user's data")
    }

});

// @desc    Get user profile
// @route   POST /users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) =>  {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
});



export {authUser, registerUser,getUserProfile  }