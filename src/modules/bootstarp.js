
import dbconn from "../../database/dbConnection.js";
import globalError from "../middleware/globalError.js";
import AppError from "../utils/Error.js";
import productRouter from "./product/product.routes.js";
import categoryRouter from "./category/category.routes.js";
import brandRouter from "./brand/brand.routes.js";
import userRouter from "./User/user.routes.js";
import subCategoryRouter from "./subCategory/subCategory.routes.js";
import dotenv from 'dotenv'
import authRouter from "./auth/auth.routes.js";
import reviewRouter from "./review/review.routes.js";
import wishlistRouter from "./wishlist/wishlist.routes.js";
import addressRouter from "./address/address.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import connection from "../../database/dbConnection.js";

export const bootstrap = (app, express) => {
  process.on("uncaughtException", (err) => {
    console.log(err);
  });
  app.use(express.json());
  connection
dotenv.config()
  const baseUrl ='/api/v1'
  app.use('/uploads',express.static('uploads'))
  app.use(`${baseUrl}/categories`,categoryRouter)
  app.use(`${baseUrl}/brands`,brandRouter)
  app.use(`${baseUrl}/subCategories`,subCategoryRouter)
  app.use(`${baseUrl}/products`,productRouter)
  app.use(`${baseUrl}/auth`,authRouter)
  app.use(`${baseUrl}/user`,userRouter)
  app.use(`${baseUrl}/review`,reviewRouter)
  app.use(`${baseUrl}/wishlist`,wishlistRouter)
  app.use(`${baseUrl}/address`,addressRouter)
  app.use(`${baseUrl}/coupon`,couponRouter)

  app.use("*", (req, res, next) => {
    next(new AppError("route not found", 400));
  });
  process.on("unhandledRejection", (err) => {
    console.log(err);
  });
  app.use(globalError);
};
