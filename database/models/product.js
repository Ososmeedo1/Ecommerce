import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema ({
title :{
     type : String,
required :[true,"title is required"],
trim :true ,
unique :[true,'title is unique'],
minLength :[2,'min length is 2 character'],
maxLength :[50,'max length is 50 character']
},
slug :{
    type : String,
    required :[true,"title is required"],
    lowerCase : true,
    trim: true
    },
mainImage : String ,
coverImages :[String],
price :{
    type : Number,
    required :[true,"price is required"],
    min : [0,'min price is 0'],
},
priceAfterDiscount :{
    type : Number,
    min : [0,'min price is 0'],
},
stock :{
    type : Number,
    required :[true,"stock is required"],
    min : [0,'min stock is 0'],
},
sold :{
    type : Number,
    min : [0,'min sold is 0'],
    default :0
},
rateCount :{
    type : Number,
    min : [0,'min rateCount is 0'],
    default :0

},
rateAvrage :{
    type : Number,
    min : [0,'min rateAvrage is 0'],
    default :0
},
createdBy:{
    type : Schema.Types.ObjectId ,
    // required :[true,"createdBy is required"],
    // ref : 'User'
},
updatedBy:{
    type : Schema.Types.ObjectId ,
    // ref : 'User'
},
category :{
    type : Schema.Types.ObjectId ,
    required :[true,"category is required"],
    ref : 'Category'
},
subCategory :{
    type : Schema.Types.ObjectId ,
    required :[true,"subCategory is required"],
    ref : 'SubCategory'
},
brand :{
    type : Schema.Types.ObjectId ,
    required :[true,"brand is required"],
    ref : 'Brand'
},
},{
    timestamps : true,
    versionKey:false,
    toJSON :{virtuals:true}
})

productSchema.post('init',function(doc){
    if(doc.mainImage){
        doc.mainImage= "http://localhost:3000/uploads/product/" + doc.mainImage
        doc.coverImages =doc.coverImages.map(img=>"http://localhost:3000/uploads/product/"+img)
    }
})

productSchema.virtual('reviews',{
    ref : "Review",
    localField:"_id",
    foreignField:"product",
})

productSchema.pre(/^find/,function(){ /// >>> معاناها اي حاجه تبدا بفايند
    this.populate('reviews')
})

const Product = mongoose.model('Product',productSchema)
export default Product