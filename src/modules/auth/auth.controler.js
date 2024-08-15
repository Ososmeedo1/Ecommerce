import bcrypt from "bcrypt"
import AppError from "../../utils/Error.js"
import catchError from "../../middleware/catchError.js"
import User from "../../../database/models/User.js"
import jwt from "jsonwebtoken"

export const signUp = catchError(async(req,res,next)=>{
    const {name,email,password}=req.body
    const hash = bcrypt.hashSync(password,8)
    const user =await User.create({
        name,email,password : hash
    })
    const token =jwt.sign({id:user.id,role:user.role},process.env.KEY)
    res.status(200).json({message:"done",token,status:200})
})

export const logIn = catchError(async(req,res,next)=>{
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user){return next(new AppError('invalid email or password'),400)}
    if(user && !bcrypt.compareSync(password,user.password)){
        return next(new AppError('invalid email or password'),400)
    }
    const token =jwt.sign({id:user.id,role:user.role},process.env.KEY)
    res.status(200).json({message:"done",token,status:200})
})
