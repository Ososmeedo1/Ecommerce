import catchError from "../../middleware/catchError.js";
import User from "../../../database/models/User.js";
import bcrypt from 'bcrypt'


export const updatePassword = catchError(async(req,res,next)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user.id)
    if(user && bcrypt.compare(oldPassword))
        await User.updateOne({
    password : bcrypt.hashSync(newPassword,10),
    passwordChanged : new Date()
    },
    {new : true})
    res.status(201).json({message :"done",user,status : 201})
})