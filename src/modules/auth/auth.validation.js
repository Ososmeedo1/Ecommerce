import joi from "joi";

const signUpSchema =joi.object({
    name : joi.string().lowercase().min(2).max(50).trim().required(),
    email :joi.string().email().required(),
    password : joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/).required(),
})
export default signUpSchema