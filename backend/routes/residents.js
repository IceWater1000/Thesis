const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection

// Fetch residents
router.get('/view', (req, res) => {
  const query = 'SELECT * FROM `barangayinhabitantsfull`';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Add a resident
router.post('/add', (req, res) => {
  const { id, firstName, lastName, middleName, age, gender } = req.body;
  const query = 'INSERT INTO inhabitants (id, firstName, lastName, middleName, age, gender) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, firstName, lastName, middleName, age, gender], (err, results) => {
    if (err) {
      console.error('Error adding resident:', err);
      res.status(500).send('Error adding resident');
    } else {
      res.status(201).send('Resident added successfully');
    }
  });
});

module.exports = router;
