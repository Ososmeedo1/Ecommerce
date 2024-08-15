import multer from "multer";
import {v4 as uuidv4} from 'uuid'
import AppError from "../utils/Error.js";
import fs from 'fs'
export const customvalidation = {
   images :['image/png','image/jpeg']
}

export const upload =(validation,folderName)=>{
    if(!fs.existsSync(`./uploads/${folderName}`)){
        fs.mkdirSync(`./uploads/${folderName}`)
    }
    const storage = multer.diskStorage({
        destination: function (req,file,cb){
            cb(null,`uploads/${folderName}`)
        },
        filename:function(req,file,cb){
            cb(null,uuidv4()+'-'+file.originalname)
        }
    })
    
    const fileFilter=(req,file,cb)=>{
        if(validation.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new AppError('invalid format',400))
        }
    }
    
    const upload = multer({
        storage,fileFilter,limits:{
            fileSize:1 * 1024 * 1024
        }
    })
    return upload
}

