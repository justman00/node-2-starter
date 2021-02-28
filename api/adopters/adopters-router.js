const express = require('express');

const AdopterMongo = require('./adopters-mongo-model');

const router = express.Router();

// PERFORM SORTING
// /api/adopters
router.get('/', (req, res) => {
  if (req.query.hello === 'world') {
    return res.json({ msg: 'Mihai salut' });
  }

  AdopterMongo.find(req.query)
    .then((adopters) => {
      res.status(200).json(adopters);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the adopters',
      });
    });
});

router.get('/:id', (req, res) => {
  AdopterMongo.findById(req.params.id)
    .then((adopter) => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: 'Adopter not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the adopter',
      });
    });
});

router.get('/:id/dogs', (req, res) => {
  AdopterMongo.findDogs(req.params.id)
    .then((dogs) => {
      if (dogs.length > 0) {
        res.status(200).json(dogs);
      } else {
        res.status(404).json({ message: 'No dogs for this adopter' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the dogs for this adopter',
      });
    });
});

router.post('/', (req, res) => {
  if (!req.body.email || !req.body.name) {
    res.status(400).json({ err: 'Name or email missing' });
  } else {
    AdopterMongo.add(req.body)
      .then((adopter) => {
        res.status(201).json(adopter);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the adopter',
        });
      });
  }
});

// DELETE ADOPTER
// /api/adopters/1
router.delete('/:id', (req, res) => {
  // sterg din baza de date
  AdopterMongo.remove(req.params.id)
    .then((deletedAdopter) => {
      res.status(200).json({ deletedAdopter });
    })
    .catch((err) => {
      // Internal server error
      res.status(500).json({ message: err });
    });
});

// UPDATE ADOPTER
// PUT /api/adopters/1
router.put('/:id', (req, res) => {
  const changedAdopter = req.body;

  AdopterMongo.update(req.params.id, changedAdopter)
    .then((updatedAdopter) => {
      res.status(200).json({ updatedAdopter });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// PATCH

// URL Structure
// https://www.google.com
// /search
// ? -> inceputul la query string
// q=stepit -> date
// & - si
// rlz=1C5CHFA_enMD912MD912&oq=stepit
// &
// aqs=chrome..69i57j46i175i199j0l2j69i60l3.897j0j7
// &
// sourceid=chrome&ie=UTF-8

// https://github.com/search?q=hello+world
// https://github.com/search?o=desc&q=hello+world&s=stars&type=Repositories
// https://github.com/search?o=desc&p=2&q=hello+world&s=stars&type=Repositories

module.exports = router;
