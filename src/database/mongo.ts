import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const mongoConnect=async()=> {
    try {
        await connect(process.env.MONGO_URI as string);
        console.log('Conectado ao banco de dados ...')
    }
    catch(error) {
    console.log(error)
    }
}