import { Router } from "express";
import { deleteWishlist, getWishlist } from "./wishlist.controler.js";
import { addWishlist } from "./wishlist.controler.js";
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";
const wishlistRouter = Router()

wishlistRouter
.get('/',getWishlist)
.post('/',authentication,authorization([roles.user]),addWishlist)
.delete('/',authentication,authorization([roles.user]),deleteWishlist)
export default wishlistRouter