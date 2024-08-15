import mongoose from "mongoose";
import { Schema } from "mongoose";
import roles from "../../src/types/roles.js";

const userSchema = new Schema ({
name :{
     type : String,
required :[true,"name is required"],
unique :[true,'name is unique'],
minLength :[2,'min length is 2 character'],
maxLength :[50,'max length is 50 character']
},
email :{
    type : String,
    required :[true,"email is required"]
},
password :{
    type : String,
    required :[true,"password is required"]
},
passwordChanged : {
type : Date
},
roles :{
    type : String,
    enum : Object.values(roles),
    default : roles.user
},
wishlist :[{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
}],
address : [
    {
        city : String,
        street : String
    }
]

},{
    timestamps : true,
    versionKey:false
})


const User = mongoose.model('User',userSchema)
export default User