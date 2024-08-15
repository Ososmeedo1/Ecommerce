import Coupon from "../../../database/models/Coupon.js";
import catchError from "../../middleware/catchError.js";
import AppError from "../../utils/Error.js";



export const getCoupons = catchError(async (req, res, next) => {
  const coupons = await Coupon.find();
  return coupons.length == 0
    ? next(new AppError("not found", 404))
    : res.status(201).json({ message: "success", coupons, status: 201 });
});

export const addCoupon = catchError(async (req, res, next) => {
  const exist = await Coupon.findOne({ code: req.body.code })
  if (exist) {
    next(new AppError('coupon already exists', 400))
  }
  const coupon = await Coupon.create(req.body)
  res.status(201).json({ message: "success", coupon, status: 201 })
})

export const updateCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params._id, req.body, { new: true })
  return !coupon
    ? next(new AppError('not found', 400))
    : res.status(201).json({ message: "success", coupon, status: 201 });
})

export const deleteCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.body._id)
  return !coupon
    ? next(new AppError('not found', 400))
    : res.status(201).json({ message: "success", status: 201 });
})