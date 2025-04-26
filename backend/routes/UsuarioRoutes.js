const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuario);
router.post('/log', usuarioController.loginUsuario); 
module.exports = router;