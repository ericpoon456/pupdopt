const admin = require('../../models/user/AdminModel');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' }); //DotENV
const { encryptPassword, comparePasswords, searchEmailAdmin } = require('../../helpers/helpers');
const { SECRET } = process.env;

// function to signin
const createAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password
    } = req.body;
    console.log(req.body);
    const newAdmin = new admin({
      name,
      email,
      phone,
      password: await encryptPassword(password)
    });
    const createdAdmin = await newAdmin.save();
    const token = jwt.sign({ id: createdAdmin._id }, SECRET, {
      expiresIn: 86400 //24 horas
    })
    return res.status(200).json({ 
      msg: `El admin ${name} fue creado exitosamente.`, 
      token: token,
      data: createdAdmin
    });
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'Hubo un error al crear un administrador',
      error: error
    });
  }
}
// Function to login
const signInAdmin = async (req, res) => {
  try {
    const { 
      email, 
      password 
    } = req.body;
    const emailFound = await searchEmailAdmin(email);
    if(!emailFound) return res.status(400).json({ 
      msg: 'Usuario no encontrado'
    });

    const matchPassword = await comparePasswords(password, emailFound.password)
    if(!matchPassword) return res.status(401).json({ 
      token: null, 
      msg: 'Autenticacion invalida'
    });
    const token = jwt.sign({ id: emailFound._id }, SECRET, {
      expiresIn: 86400 //24 horas
    });
    res.status(200).json({ 
      msg: `Bienvenido de vuelta, ${emailFound.name}`,
      token: token 
    });
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'Hubo un error al iniciar sesion',
      error: error
    });
  }
}

module.exports = {
  createAdmin,
  signInAdmin
}