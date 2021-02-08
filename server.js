import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import dotenv from 'dotenv';
dotenv.config();

//App Config

const app=express();
const port=process.env.PORT || 8001;

const password=process.env.PASSWORD;
const connection_url=`mongodb+srv://admin:${password}@cluster0.ibkvf.mongodb.net/<dbname>?retryWrites=true&w=majority`;

//Middlewares


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*"),
    res.setHeader("Access-Control-Allow-Headers","*"),
    next()
})

//DB config

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
//API Endpoint

app.get("/",(req, res)=>res.status(200).send("hello"));
app.post("/tinder/cards",(req, res)=>{
    const dbCard=req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
app.get("/tinder/cards",(req, res)=>{
    
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listener

app.listen(port,()=>console.log(`listening on ${port}`));