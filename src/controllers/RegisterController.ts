import { Request,Response } from 'express';
import { registerUser } from '../services/dataService';
import validator from 'validator';


export const createNewUser=async(req:Request,res:Response)=> {

    const {email,userName,password}=req.body

    if(userName && email && password) {
        
        let emailValid=validator.isEmail(email,{domain_specific_validation:true})
        let emailDomains=['gmail.com','hotmail.com','outlook.com','ig.com']
        let strongPassword=validator.isStrongPassword(password,{minLength:6,minUppercase:1,minSymbols:1})
        let userNameMaxLength=validator.isLength(userName,{min:4,max:10})
        
        if(!emailValid || !emailDomains.some(domain => email.includes(domain))) {
            return res.json({message:"Formato de email inválido"})
        }

        if(!strongPassword) {
           return res.json({message:"Escolha uma senha forte que atenda aos seguintes critérios mínimos: tenha no mínimo 6 caracteres, inclua pelo menos 1 letra maiúscula e 1 simbolo"})
        }

        if(!userNameMaxLength) {
            return res.json({message:"Escolha um nome de usuário com minimo de 4 caracteres e o máximo de 10 caracteres"})
        }

        if (emailValid && strongPassword && userNameMaxLength) {
            await registerUser(res,userName,email,password)
        }
        else {
            return res.json({message:"Erro inesperado"})
        }
    }
    else {
        return res.json({message:"Preencha os campos para prosseguir"})
    }
}