const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1440m' }, //expires in one day
  },
  token: {
    type: String,
    unique: true
  },
  data: {
    to: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
});

const invitation = mongoose.model('Invitation', InvitationSchema, 'invitations');
module.exports = invitation;

