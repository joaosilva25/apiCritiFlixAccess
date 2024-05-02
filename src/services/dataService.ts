import {Response,Request} from 'express'
import users from '../model/users'
import bcrypt from 'bcryptjs'



export const registerUser=async(res:Response,userName:string,email:string,password:string)=> {
    try {
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
    catch (error) {
        res.json({message:'Erro inesperado'})
    }
}

export const loginUser=async(res:Response,email:string,password:string)=> {
    try {
        const userExists= await users.findOne({email:email})

        if(userExists) {
            const paswordCompare=await bcrypt.compare(password,userExists.password)
            if(paswordCompare) {
                res.json({userExists,message:"OK"})
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
        res.json({message:'Erro inesperado com login'})
    }
}

export const movieDataSave=async(res:Response,email:string,movieName:string,movieImage:string,overview:string,movieGenres:string,id:string,releaseDate:string)=> {
    try {
        const userExists= await users.findOne({email:email})
        
        if(userExists) {
            const movieAlreadyInDB=await users.findOne({  
                myList: {
                    $elemMatch: {
                        title: movieName,
                        poster: movieImage,
                        overview: overview,
                        genre: movieGenres,
                        id: id,
                        dateRelease: releaseDate,
                    }
                }
            })
                if(!movieAlreadyInDB) {
                    const saveMovieList=await users.updateOne(
                        {email:email}, 
                        {
                            $push: {
                                myList: {
                                title: movieName,
                                poster: movieImage,
                                overview: overview,
                                genre: movieGenres,
                                id: id,
                                dateRelease: releaseDate,
                                }
                            }
                        }
                )
                    
                    if (saveMovieList) {
                        return res.json({message:'Salvo nos favoritos'})
                    }
                }
                else {
                    return res.json({message:"Já salvo na lista de favoritos"})
                }
        }
        else {
            res.json({message:"Usuário não existe"})
        }

    }
    catch(error) {
        res.json({message:'Erro inesperado'})
    }
}


export const userShow=async(res:Response,email:string)=> {
    try {
        const userExists=await users.findOne({email:email})

        if(userExists) {
            res.json({userExists})
        }
        else {
            res.json({message:"Usuário não encontrado"})
        }
    }
    catch (error) {
        res.json({message:'Erro inesperado'})
    }
}