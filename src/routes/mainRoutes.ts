import { Express,Router,Request,Response } from "express";
import * as RegisterController from "../controllers/RegisterController"
import * as LoginController from "../controllers/LoginController"


const route=Router();

route.post('/register', RegisterController.createNewUser)
route.post('/login',LoginController.userLogin)

export default route