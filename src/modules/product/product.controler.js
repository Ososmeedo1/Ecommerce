import Product from "../../../database/models/product.js";
import AppError from "../../utils/Error.js";
import slugify from "slugify";
import catchError from "../../middleware/catchError.js";
import ApiFeatures from "../../utils/apiFeatures.js";


export const addProduct = catchError(async(req,res,next)=>{
    req.body.mainImage=req.files.mainImage[0].filename
    req.body.coverImages=req.files.coverImages.map(element => element.filename)
    req.body.slug =slugify(req.body.title)
    const product = await Product.insertMany(req.body)
    return res.status(201).json({message :'success',product})
})

export const getProducts = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Product.find(),req.query)
    apiFeatures = ApiFeatures.pagination().sort().fields().search().filter()
    const products = await ApiFeatures.mongooseQuery.populate([
        {
            path : 'Category'
        },
        {
            path : 'SubCategory'
        },
        {
            path : 'Brand'
        }
    ])
    return products.length == 0 ?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',products})
    //,pageNumber : page ,size : limit
})

export const getProduct = catchError(async(req,res,next)=>{
    const {title} =req.params
    const product = await Product.findOne({title : title})
    return !product?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',product})

})

export const updateProduct =catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.title)
    const product = await Product.findByIdAndUpdate(req.params._id,req.body,{new :true})
    return !product?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',product})
})

export const deleteProduct =catchError(async(req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params._id)
    return !product?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',product})
})