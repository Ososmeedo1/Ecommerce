import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import * as userControler from "./user.controler.js";
const userRouter = Router()

userRouter.post('/',authentication,userControler.updatePassword)


export default userRouter