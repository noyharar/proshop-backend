import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.js"

const protect = asyncHandler( async (req, res, next) => {
    let token;
    let auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        try {
            token = auth.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next()
        } catch (e) {
            res.status(401);
            throw new Error("Not authorized - Invalid token")

        }
    }
})

    export {protect}