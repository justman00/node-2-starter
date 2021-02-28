require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://read_write_node_posts:${process.env.MONGO_DB_PASSWORD}@cluster0.cbszf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

const adoptersRouter = require('./adopters/adopters-router');

const server = express();

server.use(express.json());
server.use('/api/adopters', adoptersRouter);

const DogMongo = require('./dogs/dogs-mongo-model');

server.get('/api/dogs', (req, res) => {
  DogMongo.find()
    .then((dogs) => {
      res.status(200).json(dogs);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the dogs',
      });
    });
});

server.post('/api/dogs', (req, res) => {
  DogMongo.add(req.body)
    .then((dog) => {
      res.status(200).json(dog);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error creating the dog',
      });
    });
});

server.get('/', (req, res) => {
  res.send(`
    <h2>MongoDB demo</h2>
  `);
});

module.exports = server;
