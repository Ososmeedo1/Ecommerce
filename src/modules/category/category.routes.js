import { Router } from "express";
import { customvalidation, upload } from "../../middleware/fileUpload.js";
import * as categoryControler from "./category.controler.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import validaion from "../../middleware/validation.js";
import addCategorySchema from "./category.validation.js";
const categoryRouter = Router()

categoryRouter.post('/addCategory',upload(customvalidation.images,"category").single("image"),validaion(addCategorySchema),categoryControler.addCategory)
.get('/',categoryControler.getCategories)
.get('/:name',categoryControler.getCategory)
.put('/updateCategory/:_id',upload(customvalidation.images,"category").single("image"),categoryControler.updateCategory)
.delete('/delete',categoryControler.deleteCategory)
.use('/:_id/subCategories',subCategoryRouter)
export default categoryRouter