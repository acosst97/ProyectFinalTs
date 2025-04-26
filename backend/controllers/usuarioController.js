
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.obtenerUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find(req.body);
        res.status(200).json(usuarios); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las usuario', error: error.message });
    }
};

exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUser = new Usuario(req.body);
        const usuarioSave = await nuevoUser.save();
        res.status(201).json(usuarioSave); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la usuario', error: error.message });
    }
};

exports.loginUsuario = async (req, res) => {
    try {
      const { correoElectronico, contrasena } = req.body;
      console.log("data", correoElectronico ,contrasena);
      
      const usuario = await Usuario.findOne({ correoElectronico });
      
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
  
      const isPasswordValid =  (contrasena, usuario.contrasena);
      console.log("ispasww", isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
  
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuarioId: usuario._id });
  
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
  };