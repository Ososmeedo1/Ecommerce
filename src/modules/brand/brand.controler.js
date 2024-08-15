import Brand from "../../../database/models/brand.js";
import AppError from "../../utils/Error.js";
import slugify from "slugify";
import catchError from "../../middleware/catchError.js";
import ApiFeatures from "../../utils/apiFeatures.js";


export const addBrand = catchError(async(req,res,next)=>{
    const {name} = req.body
    const slug =slugify(name)
    const brand = await Brand.insertMany({name,slug,image :req.file?.filename})
    return res.status(201).json({message :'success',brand})
})

export const getBrands = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Brand.find(),req.query)
    apiFeatures = ApiFeatures.pagination().sort().fields().search()
    const brands = await ApiFeatures.mongooseQuery 
    return brands.length == 0 ?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',brands})

})
export const getBrand = catchError(async(req,res,next)=>{
    const {name} =req.params
    const brand = await Brand.findOne({name : name})
    return !brand?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',brand})

})

export const updateBrand =catchError(async(req,res,next)=>{
    const {name} =req.body
    const slug =slugify(name)
    const brand = await Brand.findByIdAndUpdate(req.params._id,{name ,slug},{new :true})
    return !brand?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success',brand})
})

export const deleteBrand =catchError(async(req,res,next)=>{
    const brand = await Brand.findByIdAndDelete(req.params._id)
    return !brand?
    next(new AppError('not found',404)) :
    res.status(201).json({message :'success'})
})