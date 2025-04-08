//Llamo las dependencias de express
//const express = require('express');//CJS sintxis
import express from 'express';// ESM sintaxis
//creo la instancia de la app de express
const app = express();

//routing
app.get('/', (req, res) => {
    //respuesta de tipo JSON
    res.send('Hola mundo en express');
});

const port = process.env || 4000;
//creamos el callback con un arround function
app.listen(port , () => {
    console.log('Servidor corriendo en el puerto: ', port);
});

