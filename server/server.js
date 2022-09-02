
//requerimos de modulos express
const express = require('express')
const exphbs = require('express-handlebars')

// Creamos un objeto de módulo 
/* Instancia del modulo express */
const app = express()

// CONFIGURACION EXPRESS HANDLEBARS

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


// STATIC MIDDLEWARE 
/*Para el servicio de archivos estáticos, como imágenes, archivos CSS y de JavaScript, utilice la
función de Middleware incorporado Express.static de Express. */

app.use('/static', express.static(__dirname + '/views'));


//MANEJADORES DE RUTA
// Manejador de ruta de handlebars render

app.get("/", function (req, res) {
    res.render('home', {
        posts: [
            {
                author: 'Janith Kasun',
                image: 'https://picsum.photos/500/500',
                comments: [
                    'This is the first comment',
                    'This is the second comment',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
                ]
            },
            {
                author: 'John Doe',
                image: 'https://picsum.photos/500/500?2',
                comments: [
                ]
            }
        ]
    });
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

