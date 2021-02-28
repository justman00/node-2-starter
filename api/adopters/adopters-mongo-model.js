const mongoose = require('mongoose');

const DogMongo = require('../dogs/dogs-mongo-model');

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

const add = (adopter) => {
  const newAdopter = new Adopter(adopter);

  return newAdopter.save();
};

const find = () => {
  return Adopter.find();
};

const findById = (id) => {
  return Adopter.findById(id);
};

const findDogs = async (userId) => {
  const adopterDogs = await DogMongo.find({ adopter: userId }).exec();
  return adopterDogs;
};

const update = (adopterId, adopterFields) => {
  return Adopter.findByIdAndUpdate(adopterId, adopterFields).exec();
};

const remove = (adopterId) => {
  return Adopter.findOneAndDelete({ _id: adopterId }).exec();
};

module.exports = { Adopter, add, find, findById, findDogs, update, remove };
