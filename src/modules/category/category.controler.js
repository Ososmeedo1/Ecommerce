import Category from "../../../database/models/category.js";
import AppError from "../../utils/Error.js";
import slugify from "slugify";
import catchError from "../../middleware/catchError.js";
import ApiFeatures from "../../utils/apiFeatures.js";
import fs from 'fs'


export const addCategory = catchError(async (req, res, next) => {
	const { name } = req.body
	const slug = slugify(name)
	const category = await Category.insertMany({ name, slug, image: req.file?.filename })
	return res.status(201).json({ message: 'success', category })
})

export const getCategories = catchError(async (req, res, next) => {
	let apiFeatures = new ApiFeatures(Category.find(), req.query)
	apiFeatures = ApiFeatures.pagination().sort().fields().search()
	const categories = await ApiFeatures.mongooseQuery
	return categories.length == 0 ?
		next(new AppError('not found', 404)) :
		res.status(201).json({ message: 'success', categories })

})
export const getCategory = catchError(async (req, res, next) => {
	const { name } = req.params
	const category = await Category.findOne({ name: name })
	return !category ?
		next(new AppError('not found', 404)) :
		res.status(201).json({ message: 'success', category })

})

export const updateCategory = catchError(async (req, res, next) => {
	const { name } = req.body
	const slug = slugify(req.body.name)
	const oldCategory = await Category.findById(req.params._id);
	if (!oldCategory) {
		return next(new AppError('not found', 404));
	}
	const updatedCategory = await Category.findByIdAndUpdate(
		req.params._id,
		{ name, slug, image: req.file?.filename },
		{ new: true }
	);
	if (req.file?.filename) {
		const oldImagePath = `uploads/category/${oldCategory.image}`;
		fs.unlink(oldImagePath)
	}
	res.status(201).json({ message: 'success', updatedCategory });
})

export const deleteCategory = catchError(async (req, res, next) => {
	const category = await Category.findByIdAndDelete(req.params._id)
	return !category ?
		next(new AppError('not found', 404)) :
		res.status(201).json({ message: 'success'})
})