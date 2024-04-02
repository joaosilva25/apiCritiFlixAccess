import { Request,Response } from 'express';
import { registerUser } from '../services/dataService';
import validator from 'validator';


export const createNewUser=async(req:Request,res:Response)=> {

    const {email,userName,password}=req.body

    let strongPassword=validator.isStrongPassword(password,{minLength:6,minUppercase:1,minSymbols:1})

    if(validator.isEmail(email) && strongPassword) {

        if(userName && email && password) {
            await registerUser(res,userName,email,password)
        }
        else {
            res.json({message:"Preencha os campos para prosseguir"})
        }
    }
    else {
        res.json({message:"Escolha uma senha forte que atenda aos seguintes critérios mínimos: tenha no mínimo 6 caracteres, inclua pelo menos 1 letra maiúscula e 1 simbolo"})
    }
}