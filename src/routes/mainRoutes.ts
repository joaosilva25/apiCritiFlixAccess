import { Express,Router,Request,Response } from "express";
import * as RegisterController from "../controllers/RegisterController"
import * as LoginController from "../controllers/LoginController"
import * as FavoriteListController from "../controllers/FavoriteListController"


const route=Router();

route.post('/register', RegisterController.createNewUser)
route.post('/login',LoginController.userLogin)
route.put('/myList',FavoriteListController.favoriteList)

export default route