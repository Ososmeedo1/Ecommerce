import { Router } from "express";
import * as authControler from "./auth.controler.js";
import validaion from "../../middleware/validation.js";
import signUpSchema from "./auth.validation.js";
const authRouter = Router()

authRouter.post('/signUp',validaion(signUpSchema),authControler.signUp)
.post('/logIn',authControler.logIn)



export default authRouter
