import { movieDataSave } from "../services/dataService";
import {Request,Response} from 'express'

export const favoriteList=async (req:Request,res:Response)=> {
    const {email,movieTitle,movieImage,genre,overview,dataRelease,trailer}=req.body;

    if(email && movieTitle && movieImage && movieImage && genre && overview && dataRelease) {
        await movieDataSave(res,email,movieTitle,movieImage,overview,genre,trailer,dataRelease);
    }
    else {
        res.json({message:"Erro inesperado"})
    }

}