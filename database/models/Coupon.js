import mongoose from "mongoose";
import { Schema } from "mongoose";

const couponSchema = new Schema({
    code :{
        type : String,
        required : true,
        unique : true
    },
    expire :{
        type : Date ,
        required : true
    },
    discount :{
        type : Number ,
        required : true
    },
},{
    timestamps:true,
    versionKey:false
})

const Coupon = mongoose.model('Coupon',couponSchema)
export default Coupon