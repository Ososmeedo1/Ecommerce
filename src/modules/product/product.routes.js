import { Router } from "express";
import * as productControler from "./product.controler.js"
import { upload, customvalidation } from "../../middleware/fileUpload.js";
import { authentication } from "../../middleware/auth.middleware.js";
import { authorization } from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";
const productRouter = Router()



productRouter.post('/addProduct',upload(customvalidation.images,"product").fields([{name:"mainImage",maxCount:1},{name :"coverImages",maxCount:5}]),productControler.addProduct)
.get('/',authentication,authorization([roles.admin]),productControler.getProducts)
.get('/:title',productControler.getProduct)
.put('/update/:_id',productControler.updateProduct)
.delete('/delete/:_id',productControler.deleteProduct)

export default productRouter