import { Schema,model,connection } from "mongoose";

type user= {
    userName: string,
    email: string,
    password: string
}

const schema= new Schema<user>({
    userName:String,
    email:String,
    password:String
})

const modelName:string= 'users'

export default (connection && connection.models[modelName])??
model<user>(modelName,schema)