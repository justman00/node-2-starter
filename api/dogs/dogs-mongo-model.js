const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  weight: Number,
  // one-to-one
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adopter',
  },
});

const Dog = mongoose.model('Dog', dogSchema);

const add = (dog) => {
  return new Dog(dog).save();
};

const find = () => {
  return Dog.find().populate('adopter').exec();
};


module.exports = { add, find, Dog };
