const organization = require('../../models/user/OrganizationModel');
const petRescue = require('../../models/mascot/PetRescueModel');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' }); //DotENV
const { encryptPassword, comparePasswords, searchEmail } = require('../../helpers/helpers');
const { SECRET } = process.env;
//Create a new organization
const createOrganization = async (req, res) => {
  try {
    const {
      name, // * Org Data
      email,
      password,
      phone,
      ownerName,
      street,
      city,
      latitude, // *  Location
      longitude,
      facebook, // * Social Media
      instagram,
      twitter,
      website,
      holder, // * Donations
      savingBank,
      bankName,
      ruc,
      tigo,
      personal,
      claro,
      description,  // * About
      profilePicture // * Picture
    } = req.body;
    
    const newOrganization = new organization({
      name, // * Org Data
      email,
      password: await encryptPassword(password),
      phone,
      ownerName,
      address : { 
        street : street,
        city : city
      },
      location : {  // *  Location
        latitude : latitude,
        longitude : longitude
      },
      social : {  // * Social Media
        facebook : facebook,
        instagram : instagram,
        twitter : twitter,
        website : website
      },
      donations : { // * Donations
        bankTransfers : {
          holder : holder,
          savingBank : savingBank,
          bankName : bankName,
          ruc : ruc
        },
        otherMethods : {
          tigo : tigo,
          personal : personal,
          claro : claro,
        }
      },
      description,  // * About
      profilePicture: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80' // * Picture
    });
    const createdOrganization = await newOrganization.save();
    const token = jwt.sign({ id: createdOrganization._id }, SECRET, {
      expiresIn: 86400 //24 horas
    })
    return res.status(200).json({ 
      msg: `La organizacion ${name} ha sido creada exitosamente en nuestra plataforma.`, 
      token: token,
      data: createdOrganization
    });
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'Hubo un iniciar sesion',
      error: error
    });
  }
}
//signIn Organization
const signInOrganization = async (req, res) => {
  try {
    const { 
      email,
      password 
    } = req.body;
    console.log(req.userId)
    const emailFound = await searchEmail(email);
    // console.log(emailFound);
    if(!emailFound) return res.status(400).json({ 
      msg: 'El correo ingresado no existe.'
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
    console.log(req.userId);
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'Hubo un error al crear una organizacion',
      error: error
    });
  }
}
// Get complete list of all organization
const getAllOrganization = async (req, res) => {
  try {
    const organizationList = await organization.find();
    return res.status(200).json({
      msg: 'Su peticion fue realizada correctamente',
      data: organizationList
    });
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'Hubo un error al realizar la peticion',
      error: error
    });
  }
}
// Obtain an Organization by id
const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organizationId = await organization.findById(id);
    const rescueId = await petRescue.find({ postCreator: id });
    console.log(rescueId)
    return res.status(200).json({
      msg: 'Su peticion fue realizada correctamente',
      data: {
        organizationId,
        post: {
          rescueId
        }
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(405).json({
      msg: 'Hubo un error al realizar la peticion',
      error: error
    });
  }
}
// Get all organization by city
const getOrganizationByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const organizationCity = await organization.find({address: { city } });
    return res.status(200).json({
      msg: 'Su peticion fue realizada correctamente',
      data: organizationCity
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al realizar la peticion',
      error: error
    });
  }
}
// change the data of an organization
const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, // * Org Data
      email,
      password,
      phone,
      ownerName,
      street,
      city,
      latitude, // *  Location
      longitude,
      facebook, // * Social Media
      instagram,
      twitter,
      website,
      holder, // * Donations
      savingBank,
      bankName,
      ruc,
      tigo,
      personal,
      claro,
      description // * About
    } = req.body;
    const organization = await organization.findByIdAndUpdate(id, {
      name, // * Org Data
      email,
      password: await encryptPassword(password),
      phone,
      ownerName,
      address : { 
        street : street,
        city : city
      },
      location : {  // *  Location
        latitude : latitude,
        longitude : longitude
      },
      social : {  // * Social Media
        facebook : facebook,
        instagram : instagram,
        twitter : twitter,
        website : website
      },
      donations : { // * Donations
        bankTransfers : {
          holder : holder,
          savingBank : savingBank,
          bankName : bankName,
          ruc : ruc
        },
        otherMethods : {
          tigo : tigo,
          personal : personal,
          claro : claro,
        }
      },
      description // * About
    });
    const updatedOrganization = await organization.save();
    return res.status(200).json({ 
      msg: `Los datos de ${name} han sido actualizados.`,
      data: updatedOrganization
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al realizar la peticion',
      error: error
    });
  }
}
//Delete an organization
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    await organization.findByIdAndDelete(id)
    const newOrganizationList = await organization.find();
    return res.status(200).json({ 
      msg: 'La organizacion ha sido eliminada.', 
      data: newAdoptionList 
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al realizar la peticion',
      error: error
    });
  }
}

module.exports = {
  createOrganization,
  signInOrganization,
  getAllOrganization,
  getOrganizationById,
  getOrganizationByCity,
  updateOrganization,
  deleteOrganization
}