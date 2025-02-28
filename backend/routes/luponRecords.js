const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection

router.post('/add', (req, res) => {
  const { NameOfComplainant,
    NameOfComplaint,
    NameOfRespondents,
    ComplainDetails,
    CaseNo,
    DateWritten,
    IsResolve,
    } = req.body;
  const query = "INSERT INTO `luponrecords` (`NameOfComplainant`, `NameOfComplaint`, `NameOfRespondents`, `ComplainDetails`, `CaseNo`, `DateWritten`, `IsResolve`) VALUES (?, ?, ?, ?, ?, ?, ?);";
  db.query(query, [NameOfComplainant,
    NameOfComplaint,
    NameOfRespondents,
    ComplainDetails,
    CaseNo,
    DateWritten,
    IsResolve,], (err, results) => {
    if (err) {
      console.error('Error adding resident:', err);
      res.status(500).send('Error adding resident');
    } else {
      res.status(201).json({
        id: results.insertId
      })
    }
  });
});
router.post('/update', (req, res) => {
  const {
    Id,
    NameOfComplainant,
    NameOfComplaint,
    NameOfRespondents,
    ComplainDetails,
    CaseNo,
    DateWritten,
    IsResolve,
  } = req.body; // Extract data from the request body

  const query = `
    UPDATE luponrecords
    SET
      NameOfComplainant = ?,
      NameOfComplaint = ?,
      NameOfRespondents = ?,
      ComplainDetails = ?,
      CaseNo = ?,
      DateWritten = ?,
      IsResolve = ?
    WHERE Id = ?`;

  db.query(
    query,
    [ 
      NameOfComplainant,
    NameOfComplaint,
    NameOfRespondents,
    ComplainDetails,
    CaseNo,
    DateWritten,
    IsResolve,
    Id,
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
router.get("/view",(req,res)=>{
    const query = "SELECT * FROM `luponrecords`";
    db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching lupon:', err);
          res.status(500).send(err);
        } else {
          res.json(results);
          console.log(res);
        }
      });
});
router.delete('/delete/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter


    const deleteResidentQuery = "DELETE FROM luponrecords WHERE `luponrecords`.`Id` = ?";
    db.query(deleteResidentQuery, [residentId], (deleteResidentErr, deleteResidentResults) => {
      if (deleteResidentErr) {
        console.error("Error deleting resident:", deleteResidentErr);
        return res.status(500).json({ message: "Error deleting resident", error: deleteResidentErr });
      }

      res.json({ message: "Data deleted successfully", affectedRows: deleteResidentResults.affectedRows });
    });
});
router.get('/getMember/:id',(req,res)=>{
  const memberID = req.params.id ;
  const query = "SELECT * FROM `luponrecords` WHERE Id = ?";
  db.query(query,[memberID],(err,results)=>{
    if (err) {
      
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send({ message: 'Resident not found' });
    } else {
      res.json(results[0]); // Send the first (and likely only) result
    }
  });
})



module.exports = router;