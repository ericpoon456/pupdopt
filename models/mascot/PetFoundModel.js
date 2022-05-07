const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Mongoose pagination
const mongoosePaginate = require('mongoose-paginate-v2');

const PetFoundSchema = new Schema({
  petData: {
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
        type: String,
        required: true
      }
    ],
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

PetFoundSchema.plugin(mongoosePaginate)

const petFound = mongoose.model('PetFound', PetFoundSchema, 'petfounds');
module.exports = petFound;