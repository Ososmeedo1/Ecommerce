import { Router } from "express";
import * as brandControler from "./brand.controler.js";
import { customvalidation, upload } from "../../middleware/fileUpload.js";
import validaion from "../../middleware/validation.js";
import addBrandSchema from "./brand.validation.js";
const brandRouter = Router()

brandRouter.post('/addBrand',upload(customvalidation.images,'brand').single('image'),validaion(addBrandSchema)
,brandControler.addBrand)
.get('/',brandControler.getBrands)
.get('/:name',brandControler.getBrand)
.put('/update/:_id',brandControler.updateBrand)
.delete('/delete',brandControler.deleteBrand)
export default brandRouter


