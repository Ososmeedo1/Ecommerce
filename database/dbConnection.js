import { connect } from "mongoose";
const connection = connect('mongodb://localhost:27017/Ecommerce').then(()=>{
    console.log("DB connected");
}).catch(()=>{
    console.log("database failure");
})
export default connection