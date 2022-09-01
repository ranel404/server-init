//requerimos rutas
const route1 = require('./routes/route-1');

//requerimos el modulo de express
const express = require('express')

// Creamos un objeto de módulo 
/* Instancia del modulo express */
const app = express()


//MANEJADORES DE RUTA



// Una función de devolución de llamada individual puede manejar una ruta.
app.get('/', (req, res) => {

    //enviar respuesta
    res.send('Message send from server whit Method GET')
})

// Más de una función de devolución de llamada puede manejar una ruta
// (asegúrese de especificar el objeto next). 
app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function')
    next()
}, () => {
    res.send('Hello from B!')
})

// Una matriz de funciones de devolución de llamada puede manejar una ruta.
const cb0 = (req, res, next) => {
    console.log('CB0');
    next();
}
const cb1 = (req, res, next) => {
    console.log('CB1');
    next();
}
const cb2 = (req, res) => {
    res.send('Hello from C!');
}
app.get('/example/c', [cb0, cb1, cb2]);

//RUTAS

app.use('/route1', route1);


/*Hay un método de direccionamiento especial, app.all(), que no se deriva de ningún método HTTP. 
La usamos para cargar funciones de Middleware en una vía de acceso para todos los métodos de solicitud*/

app.all('/Secret', (res, req) => {

    console.log('Accessing the secret section')
})

// DEFINIMOS RUTA DE ERROR


/*Ya que Express muestra el mensaje de erro cuando no se encuentra ninguna coincidencia
para un URI dado en la tabla de enrutamiento, esto significa que definimos una ruta para
manejar los errores asegurándonos de que sea la última en la tabla de enrutamiento */

// this matches all routes and all methods
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Not found'
    })
    next(error)
})
// error handler Middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

//PONEMOS EL SERVIDOR A ESCUCHAR
app.listen(3000, () => {
    console.log('server on port:', 3000)
})

