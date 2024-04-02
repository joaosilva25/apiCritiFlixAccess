import dotenv from "dotenv";
import express from "express";
import path from "path";
import mainRoute from "./routes/mainRoutes"
import { mongoConnect } from "./database/mongo";
import cors from "cors";


dotenv.config()

mongoConnect()

const app=express();

app.use(cors());

app.use(express.static(path.join(__dirname,'../public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mainRoute)

app.listen(process.env.PORT)
