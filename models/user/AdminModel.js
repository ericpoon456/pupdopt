const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: { 
    type: String,
    unique: true,
    required: true
  },
  email: { 
    type: String, 
    unique: true,
    required: true
  },
  phone: { 
    type: String,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const admin = mongoose.model('Admin', AdminSchema, 'admins');
module.exports = admin;
