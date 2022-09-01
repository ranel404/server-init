var express = require('express');

// referenciamos la instancia del metodo Router de express
var router = express.Router();


// MIDDLEWARES


// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
 console.log('Time: ', Date.now());
 next();
});

//ROUTES

// define the home page route
router.get('/', function(req, res) {
 res.send('route-1 home page');
});
// define the about route
router.get('/about', function(req, res) {
 res.send('About route-1');
});

module.exports = router;