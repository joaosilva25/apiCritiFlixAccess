import {Response,Request} from 'express'
import users from '../model/users'
import bcrypt from 'bcryptjs'



export const registerUser=async(res:Response,userName:string,email:string,password:string)=> {
    const userExists= await users.findOne({email:email,userName:userName})

    const hashPass=bcrypt.hashSync(password,10)

    if(!userExists) {
        try {
            const createUser = await users.create({userName:userName,email:email,password:hashPass})
            res.json({message:'OK'})
        }
        catch (error) {
            res.json({error:"Erro na criação do usuário"})
        }
    }
    else {
        res.json({message:'Usuário já existe'})
    }
}

export const loginUser=async(res:Response,email:string,password:string)=> {
    try {
        const userExists= await users.findOne({email:email})

        if(userExists) {
            const paswordCompare=await bcrypt.compare(password,userExists.password)
            if(paswordCompare) {
                res.json({message:'Usuário logado'})
            }
            else {
                res.json({message:'Senha incorreta'})
            }
        }
        else {
            res.json({message:'Usuário não registrado'})
        }
    }
    catch(error) {
        console.log({message:'Erro inesperado com login'})
    }
}