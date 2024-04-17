import { Express,Router,Request,Response } from "express";
import * as RegisterController from "../controllers/RegisterController"
import * as LoginController from "../controllers/LoginController"
import * as FavoriteListController from "../controllers/FavoriteListController"
import * as UserDataController from "../controllers/UserDataController"


const route=Router();

route.post('/register', RegisterController.createNewUser)
route.post('/login',LoginController.userLogin)
route.put('/myList',FavoriteListController.favoriteList)
route.get('/userData',UserDataController.userData)


export default route