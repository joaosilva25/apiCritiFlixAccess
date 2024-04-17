import { Request,Response } from 'express';
import { userShow } from '../services/dataService'


export const userData=async(req:Request,res:Response)=> {
    let email:string=req.params.email

    if(email) {
        await userShow(res,email)
    }
    else {
        res.json({message:'preencha o email para prosseguir' })
    }

}