import { Router } from "express";
import * as subCategoryControler from "./subCategory.controler.js";
import { customvalidation, upload } from "../../middleware/fileUpload.js";
import validaion from "../../middleware/validation.js";
import addSubCategorySchema from "./subCategory.validation.js";
const subCategoryRouter = Router({mergeParams : true})

subCategoryRouter.post('/addSubCategory',upload(customvalidation.images,'subCategory').single('image'),validaion(addSubCategorySchema)
,subCategoryControler.addSubcategory)
.get('/',subCategoryControler.getSubCategories)
.get('/:name',subCategoryControler.getSubCategory)
.put('/update/:_id',subCategoryControler.updateSubCategory)
.delete('/delete/:_id',subCategoryControler.deleteSubCategory)
export default subCategoryRouter



