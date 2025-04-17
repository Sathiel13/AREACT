//Llamo las dependencias de express
//const express = require('express');//CJS sintxis
import express from 'express';// ESM sintaxis
import cors from 'cors';
import 'dotenv/config'
//creo la instancia de la app de express
import router  from "./router";
import {connectDB} from "./config/db";
import {corsConfig} from "./config/cors";

connectDB();


const app = express();

//Cors
app.use(cors(corsConfig))



//Leer datos de formularios
app.use(express.json());
app.use('/',router);
export default app;