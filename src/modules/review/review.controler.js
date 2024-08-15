import AppError from "../../utils/Error.js";
import catchError from "../../middleware/catchError.js";
import Review from "../../../database/models/review.js";
import roles from "../../types/roles.js";


export const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user.id
  const exist = await Review.find({
    product: req.body.product,
    user: req.user.id
  })
  if (exist.length > 0) {
    next(new AppError('you reviewed this product', 404))
  }
  const review = await Review.create(req.body)
  res.status(201).json({ message: "success", review, status: 201 })
})

export const getReviews = catchError(async (req, res, next) => {
  const review = await Review.find().populate('User')
  return review.length == 0 ?
    next(new AppError('not found', 404))
    : res.status(200).json({ message: "success", review, status: 200 })
})

export const updateReview = catchError(async (req, res, next) => {
  const exist = await Review.findById(req.params.id)
  if (!exist) {
    next(new AppError('not found', 404))
  }
  if (exist.user.toString() === req.user.id || req.user.role === roles.admin) {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return !review
      ? next(new AppError('not found', 404))
      : res.status(200).json({ message: "success", review, status: 200 })
  } else {
    next(new AppError('you are not authorized to update', 404))
  }
})

export const deleteReview = catchError(async (req, res, next) => {
  const exist = await Review.findById(req.params.id)
  if (!exist) {
    next(new AppError('not found', 404))
  }
  if (exist.user.toString() === req.user.id || req.user.role === roles.admin) {
    const review = await Review.findByIdAndDelete(req.params.id)
    return !review
      ? next(new AppError('not found', 404))
      : res.status(200).json({ message: "success", status: 200 })
  } else {
    next(new AppError('you are not authorized to delete', 404))
  }
})