const mongoose = require('mongoose');
const { Dog } = require('../dogs/dogs-mongo-model');

const adopterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Adopter = mongoose.model('Adopter', adopterSchema);
// CRUD
const find = () => {
  return Adopter.find().exec();
};

const add = (adopter) => {
  return new Adopter(adopter).save();
};

const findById = (adopterId) => {
  return Adopter.findById(adopterId).exec();
};

const remove = (adopterId) => {
  return Adopter.findOneAndDelete({ _id: adopterId }).exec();
};

const update = (adopterId, changedAdopter) => {
  return Adopter.findByIdAndUpdate(adopterId, changedAdopter).exec();
};

const findDogs = (adopterId) => {
  return Dog.find({ adopter: adopterId }).exec();
};

module.exports = {
  find,
  add,
  findById,
  remove,
  update,
  findDogs,
};
