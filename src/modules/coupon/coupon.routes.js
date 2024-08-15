import { Router } from "express";
import * as couponControler from "./coupon.controler.js";
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";
const couponRouter = Router()

couponRouter
.get('/',couponControler.getCoupons)
.post('/',authentication,authorization([roles.admin]),couponControler.addCoupon)
.put('/_id',authentication,authorization([roles.admin]),couponControler.updateCoupon)
.delete('/_id',authentication,authorization([roles.admin]),couponControler.deleteCoupon)
export default couponRouter