const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection


router.delete('/delete/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter


    const deleteResidentQuery = "DELETE FROM household WHERE HouseholdNumber = ?";
    db.query(deleteResidentQuery, [residentId], (deleteResidentErr, deleteResidentResults) => {
      if (deleteResidentErr) {
        console.error("Error deleting resident:", deleteResidentErr);
        return res.status(500).json({ message: "Error deleting resident", error: deleteResidentErr });
      }

      res.json({ message: "Data deleted successfully", affectedRows: deleteResidentResults.affectedRows });
    });
});
router.post('/update', (req, res) => {
  const {
    HouseholdNumber,
    AddressID,
    TotalInhabitants,
    HouseholdHead,

  } = req.body; // Extract data from the request body

  const query = `
    UPDATE household
    SET
      AddressID = ?,
      TotalInhabitants = ?,
      HouseholdHead = ?
    WHERE HouseholdNumber = ?`;

  db.query(
    query,
    [     
      AddressID,
      TotalInhabitants,
      HouseholdHead,
      HouseholdNumber,
    ],
    (err, results) => {
      if (err) {
        console.error('Error updating resident:', err);
        return res.status(500).json({ message: 'Error updating resident', error: err });
      }
      res.json({ message: 'Resident updated successfully', results });
    }
  );
});
router.get('/getHouse/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter
  const query = "SELECT * FROM `household` WHERE HouseholdNumber = ?";
  
  db.query(query, [residentId], (err, results) => {
    if (err) {
      console.error('Error fetching resident:', err);
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send({ message: 'Resident not found' });
    } else {
      res.json(results[0]); // Send the first (and likely only) result
    }
  });
}); 
router.get('/householdtracking', (req, res) => {
  const query = "SELECT * FROM `householdtracker`" ;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
      console.log(res);
    }
  });
});
// Get Inhabitants
router.get('/view', (req, res) => {
    const query = "SELECT * FROM `householdsfull` ORDER BY `householdsfull`.`HouseholdNumber` ASC" ;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      } else {
        res.json(results);
        console.log(res);
      }
    });
});
router.get('/view2', (req, res) => {
  const query = 'SELECT * FROM `householdsfull` ORDER BY `householdsfull`.`TotalInhabitants` ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/views', (req, res) => {
  const query = 'SELECT * FROM `householdsfull` ORDER BY `householdsfull`.`householdNumber` DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/views2', (req, res) => {
  const query = 'SELECT * FROM `householdsfull`ORDER BY `householdsfull`.`TotalInhabitants` DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.post('/add', (req, res) => {
  const { HouseholdNumber,
    AddressID,
    TotalInhabitants,
    HouseholdHead,
    } = req.body;
  const query = 'INSERT INTO `household` (`HouseholdNumber`, `AddressID`, `TotalInhabitants`, `HouseholdHead`) VALUES (?, ?, ?, ?)';
  db.query(query, [HouseholdNumber,
    AddressID,
    TotalInhabitants,
    HouseholdHead,
    ], (err, results) => {
    if (err) {
      if(err.code == "ER_DUP_ENTRY"){
        res.status(409).json({ message: 'Duplicate entry detected', error: err });
      } else {
        console.error('Error adding resident:', err);
      res.status(500).send(err);
      }
      
    } else {
      res.status(201).send('Resident added successfully');
    }
  });
});
module.exports = router;