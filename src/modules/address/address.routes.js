import { Router } from "express";
import { authentication, authorization } from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";
import { addAddress, deleteAddress, getAddress } from "./address.controler.js";
const addressRouter = Router()

addressRouter
.get('/',getAddress)
.post('/',authentication,authorization([roles.user]),addAddress)
.delete('/:id',authentication,authorization([roles.user]),deleteAddress)
export default addressRouter