// Authentication
const jwt = require("jsonwebtoken");
const organization = require("../models/user/OrganizationModel");
const admin = require("../models/user/AdminModel");
const invitation = require ("../models/user/InvitationModel");

require("dotenv").config({ path: ".env" }); //DotENV
const { SECRET } = process.env;

const hasPermission = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    console.log(token)
    if (!token)
      return res.status(403).json({
        msg: "Acceso denegado",
    });
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    //check if it's an admin
    const foundAdmin = await admin.findById(req.userId, { password: 0 });
    //check if it's an organization
    const foundOrganization = await organization.findById(req.userId, { password: 0 });
    //if anyone exists return an error
    if (!foundOrganization && !foundAdmin)
      return res.status(404).json({
        msg: "Token no valido",
      });

    // if someone exists, next
    next();
  } catch (error) {
    return res.status(401).send({
      msg: "No autorizado",
    });
  }
};

const isAdmin = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(token);

  if (!token)
    return res.status(403).json({
      msg: "Acceso denegado",
  });

  try {
    const decoded = jwt.verify(token, SECRET);
    const { id } = decoded;

    const foundAdmin = await admin.findById(id, { password: 0 });
    if (!foundAdmin) return res.status(404).json({
        msg: "Token no valido",
      });
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).send({
      msg: "No autorizado",
    });
  }
};

const checkDuplicateNameOrEmail = async (req, res, next) => {
  try {
    const organizationNameCheck = await organization.findOne({
      name: req.body.name,
    });
    if (organizationNameCheck) return res.status(400).json({
      msg: "El nombre ya existe",
    });
    const organizationEmailCheck = await organization.findOne({
      email: req.body.email,
    });
    if (organizationEmailCheck)
      return res.status(400).json({
        msg: "El correo ya esta registrado",
      });
    next();
  } catch (error) {
      return res.status(500).json({
      msg: error,
    });
  }
};

const isInvited = async (req, res, next) => {
  try {
    const { token } = req.params;
    console.log(token)
    //checks if the token exists
    const foundToken = await invitation.find({token});
    console.log(foundToken)
    //if the token does not exist return an error
    if (!foundToken || foundToken == '')
      return res.status(404).json({
        msg: "Token no valido",
      });
    // next
    next();
  } catch (error) {
    return res.status(401).send({
      msg: "No autorizado",
    });
  }
}

module.exports = {
  hasPermission,
  isAdmin,
  checkDuplicateNameOrEmail,
  isInvited
};
