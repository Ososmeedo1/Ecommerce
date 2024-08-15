import SubCategory from "../../../database/models/subCategory.js";
import AppError from "../../utils/Error.js";
import slugify from "slugify";
import catchError from "../../middleware/catchError.js";
import ApiFeatures from "../../utils/apiFeatures.js";


export const addSubcategory = catchError(async (req, res, next) => {
  const { name, category } = req.body
  const slug = slugify(name)
  const subCategory = await SubCategory.insertMany({ name, slug, category, image: req.file?.filename })
  return res.status(201).json({ message: 'success', subCategory })
})

export const getSubCategories = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
  apiFeatures = ApiFeatures.pagination().sort().fields().search()
  const subCategories = await ApiFeatures.mongooseQuery.populate('Category')
  return subCategories.length == 0 ?
    next(new AppError('not found', 404)) :
    res.status(201).json({ message: 'success', subCategories })

})
export const getSubCategory = catchError(async (req, res, next) => {
  const { name } = req.params
  const subCategory = await SubCategory.findOne({ name: name }).populate('Category')
  return !subCategory ?
    next(new AppError('not found', 404)) :
    res.status(201).json({ message: 'success', subCategory })

})

export const updateSubCategory = catchError(async (req, res, next) => {

  req.body.slug = slugify(req.body.name)
  const subCategory = await SubCategory.findByIdAndUpdate(req.params._id, { ...req.body, image: req.file?.filename }, { new: true })
  return !subCategory ?
    next(new AppError('not found', 404)) :
    res.status(201).json({ message: 'success', subCategory })
})

export const deleteSubCategory = catchError(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params._id)
  return !subCategory ?
    next(new AppError('not found', 404)) :
    res.status(201).json({ message: 'success'})
})