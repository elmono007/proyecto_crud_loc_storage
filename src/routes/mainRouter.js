const express = require('express');

const path = require('path');
const mainController = require('../controllers/mainController');

//Definimos la variable router quien nos va a rutear los pedidos al controlados
const router = express.Router();       

//Rutas Get
router.get('/', mainController.home);

router.get('/borrar/:id', mainController.borrar);

// RutasPost 
router.post('/save', mainController.save);


module.exports = router;