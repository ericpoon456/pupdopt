const invitation = require('../../models/user/InvitationModel');
const { sendInvitationEmail } = require('../../config/nodemailer');
const { v4: uuidv4 } = require('uuid');

// function to create a invitation link 
const createInvitationLink = async (req, res) => {
  try {
    const { 
      to, 
      name 
    } = req.body;
    const newInvitationLink = new invitation({
      data: {
        to,
        name
      },
      token: uuidv4()
    });
    const createdInvitationLink = await newInvitationLink.save();
    const { token } = createdInvitationLink
    sendInvitationEmail( name, to, token );
    // console.log(`${name} name, ${token} token y ${to} destino`)
    return res.status(200).json({ 
      msg: `El link de invitacion para ${name} fue enviado exitosamente.`, 
      data: createdInvitationLink
    });
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'No se pudo enviar el link de invitacion',
      error: error
    });
  }
}

module.exports = { createInvitationLink }