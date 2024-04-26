import { Schema,model,connection } from "mongoose";

type user= {
    userName: string,
    email: string,
    password: string
    myList: {
        movies:{
            movieTitle:string[],
            movieImage:string[]
            movieGenres:string[]
        },
    }
}

const schema= new Schema<user>({
    userName:String,
    email:String,
    password:String,
    myList: {
        movies: {
            movieTitle:[String],
            movieImage:[String],
            movieGenres:[String]
        }
    }
})

const modelName:string= 'users'

export default (connection && connection.models[modelName])??
model<user>(modelName,schema)