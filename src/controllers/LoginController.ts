import { Request,Response } from 'express';
import { loginUser } from '../services/dataService';


export const userLogin=async (req:Request, res:Response)=> {
    const {email,password}=req.body;

    if(email && password) {
        await loginUser(res,email,password);
    }
    else {
        res.json({message:"Preencha os campos para prosseguir"})
    }
}