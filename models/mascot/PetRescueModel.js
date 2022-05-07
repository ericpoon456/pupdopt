const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Mongoose pagination
const mongoosePaginate = require('mongoose-paginate-v2');

const PetRescueSchema = new Schema({
  petData:{
    petName : {
      type: String,
      required: true
    },
    petSpecie: {
      type: String,
      required: true
    },
    petSize: {
      type: String,
      required: true
    },
    petSex: {
      type: String,
      required: true
    },
    petBreed: {
      type: String,
      required: true
    },
    petDescription: {
      type: String,
      required: true
    },
    petCity: {
      type: String,
      required: true
    },
    petLocation: {
      latitude: {
        type: Number,
        default: 55.1,
        required: true
      },
      longitude: {
        type: Number,
        default: -0.91,
        required: true
      }
    },
    petVaccines: {
      type: Boolean,
      default: false
    },
    petSterilized: {
      type: Boolean,
      default: false
    },
    petPictures: [
      {
        type: Object,
        required: true
      }
    ]
  },
  postCreator:{
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  petContact: {
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    whatsapp: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: Date.now()
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '86400m' }, //expires in 60 days
  }
});

PetRescueSchema.plugin(mongoosePaginate)

const petRescue = mongoose.model('PetRescue', PetRescueSchema, 'petrescues');
module.exports = petRescue;