import mongoose from "mongoose";
import { Schema } from "mongoose";

const subcategorySchema = new Schema ({
name :{
     type : String,
required :[true,"name is required"],
trim :true ,
unique :[true,'name is unique'],
minLength :[2,'min length is 2 character'],
maxLength :[50,'max length is 50 character']
},
slug :{
    type : String,
    required :[true,"name is required"],
    lowerCase : true,
    trim: true
    },
image : String ,
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
}
},{
    timestamps : true,
    versionKey:false
})
subcategorySchema.post('init',function(doc){
    if(doc.image){
        doc.image= "http://localhost:3000/uploads/subCategory/" + doc.image
    }
})

const SubCategory = mongoose.model('SubCategory',subcategorySchema)
export default SubCategory