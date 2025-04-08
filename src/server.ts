//Llamo las dependencias de express
//const express = require('express');//CJS sintxis
import express from 'express';// ESM sintaxis
import 'dotenv/config'
//creo la instancia de la app de express
import router  from "./router";
const app = express();

import {connectDB} from "./config/db";
connectDB();

//Leer datos de formularios
app.use(express.json());


app.use('/',router);

export default app;