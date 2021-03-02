const express = require('express');
const adoptersRouter = require('./adopters/adopters-router');

const server = express();

server.use(express.json());
server.use('/api/adopters', adoptersRouter);

const Dog = require('./dogs/dogs-model');

server.get('/api/dogs', (req, res) => {
  Dog.find()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(error => {
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
