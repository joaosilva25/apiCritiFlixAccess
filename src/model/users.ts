import { Schema,model,connection } from "mongoose";

interface Movie {
    title:string;
    poster:string,
    overview:string,
    genre:string,
    id:string
    dateRelease:string,
}

type user= {
    userName: string,
    email: string,
    password: string
    myList:Movie[]
}

const schema= new Schema<user>({
    userName:String,
    email:String,
    password:String,
    myList: [ {
        title: { type: String, required: true },
        poster: { type: String, required: true },
        overview: { type: String, required: true },
        genre: { type: String, required: true },
        id: { type: String ,required: true},
        dateRelease: { type: String, required: true },
    }]
})

const modelName:string= 'users'

export default (connection && connection.models[modelName])??
model<user>(modelName,schema)