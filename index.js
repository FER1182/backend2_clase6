const express = require("express")
const path =require("path")
const Contenedor =require("./contenedor")
const nombreArchivo = "productos.json";

let archivos = new Contenedor(nombreArchivo);


const app = express()//asi creo el servidor


const PORT = process.env.PORT || 8080//esto es para el servidor remoto

app.get("/", (req,res)=>{
        res.send("INICIO")
})

app.get("/productos", (req,res)=>{

    res.send(archivos.getAll())

});

app.get("/productosRandom", (req,res)=>{
    let max = archivos.getAll().length;
    let idRandom = Math.floor((Math.random() * max)+1);
    res.send(archivos.getById(idRandom))


});


app.listen(8080,()=>{
    console.log("server run on port 8080")
})
