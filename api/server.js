require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@stepit-cluster.cbszf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
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
    .then((createdDog) => {
      res.status(200).json(createdDog);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the dogs',
      });
    });
});

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Shelter API</h>
    <p>Welcome to the Lambda Shelter API</p>
  `);
});

module.exports = server;
