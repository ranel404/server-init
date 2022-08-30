
//requerimos el modulo de express
const express = require ('express') 

// Creamos un objeto de módulo 
/* Instancia del modulo express */
const app =  express()


//Devoluciones de llamadas

app.get('/', (req,res)=>{

    //enviar respuesta
    res.send('Mensaje del servidor')
})
//Ponemos el servidor a escuchar

const server = app.listen(3000, ()=>{
    console.log('server on port:', 3000)
})