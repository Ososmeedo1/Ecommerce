import catchError from "./catchError.js";
import AppError from "../utils/Error.js";
import jwt from"jsonwebtoken"
import User from "../../database/models/User.js";

export const authentication =catchError(async(req,res,next)=>{
    const auth =req.headers.authorization
    if(!auth){
        return next(new AppError("authorized",401))
    }
    const token =auth.split(" ")[1]
    const decoded=jwt.verify(token,process.env.Hi)
    if(!decoded){
        return next(new AppError("authorized",401))
    }
    const exist =await User.findById(decoded.id)
    if(!exist){
        return next(new AppError("authorized",401))
    }
    if(!exist.passwordChanged){
        req.user =decoded
       return next()
    }
const time = parseInt(exist.passwordChanged.getTime()/1000)
if(time > decoded.iat){
    return next(new AppError("authorized",401))
}
req.user =decoded
next()
})

export const authorization = (roles)=>{
    return catchError(async(req,res,next)=>{
        if(!roles.includes(req.user.roles)){
            return next(new AppError("forbidden",401))
        }
        next()
    })
}