import { Router } from "express";
import * as reviewControler from "./review.controler.js";
import { authentication } from "../../middleware/auth.middleware.js";
import { authorization } from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";
const reviewRouter =Router()

reviewRouter.post('/',authentication,authorization([roles.user]),reviewControler.addReview)
.get('/',reviewControler.getReviews)
.put('/:id',authentication,authorization([roles.admin,roles.user]),reviewControler.updateReview)
.delete('/',authentication,authorization([roles.admin,roles.user]),reviewControler.deleteReview)
export default reviewRouter