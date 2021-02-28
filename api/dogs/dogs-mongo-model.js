const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  weight: Number,
  adopter: { type: mongoose.Schema.Types.ObjectId, ref: 'Adopter' },
});

const Dog = mongoose.model('Dog', dogSchema);

const add = (dog) => {
  const newDog = new Dog(dog).save();

  return newDog;
};

const find = () => {
  return Dog.find();
};

module.exports = { Dog, add, find };
