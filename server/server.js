
//requerimos de modulos express
const express = require('express')


// Creamos un objeto de módulo 
/* Instancia del modulo express */
const app = express()

// CONFIGURACION MOTOR DE PLANTILLAS: PUG


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// STATIC MIDDLEWARE 
/*Para el servicio de archivos estáticos, como imágenes, archivos CSS y de JavaScript, utilice la
función de Middleware incorporado Express.static de Express. */

app.use('/static', express.static(__dirname + '/views'));



// MANEJADOR DE RUTAS: PUG
app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.render('index');

});
app.get('/member/:name/planet/:home', (req, res) => {
    const memberDetails = {
        member: req.params.name,
        planet: req.params.home
    }
    res.render('guardian', memberDetails);
});



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

