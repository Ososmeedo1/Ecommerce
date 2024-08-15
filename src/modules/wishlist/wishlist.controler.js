import User from "../../../database/models/User.js";
import catchError from "../../middleware/catchError.js";
import AppError from "../../utils/Error.js";

export const addWishlist = catchError(async (req, res, next) => {
  const wishlist = await User.findByIdAndUpdate(req.user.id, {
    $addToSet : {wishlist:req.body.product}
  }, { new: true });
  return res.status(201).json({ message: "success" ,wishlist});
});

export const getWishlist = catchError(async (req, res, next) => {
  const wishlist = await User.find();
  return wishlist.length == 0
    ? next(new AppError("not found", 404))
    : res.status(201).json({ message: "success", wishlist });
});

export const deleteWishlist = catchError(async (req, res, next) => {
    const wishlist = await User.findByIdAndUpdate(req.user.id, {
        $pull : {wishlist:req.body.product}
      },{new : true});
  return !wishlist
    ? next(new AppError("not found", 404))
    : res.status(201).json({ message: "success", wishlist });
});
