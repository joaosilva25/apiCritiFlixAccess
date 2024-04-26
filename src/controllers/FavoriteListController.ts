import { movieDataSave } from "../services/dataService";
import {Request,Response} from 'express'

export const favoriteList=async (req:Request,res:Response)=> {
    const {email,movieTitle,movieImage,movieGenres}=req.body;

    if(email && movieTitle && movieImage) {
        await movieDataSave(res,email,movieTitle,movieImage,movieGenres);
    }
    else {
        res.json({message:"Erro inesperado"})
    }

}