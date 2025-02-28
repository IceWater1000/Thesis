const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection

//update
router.post('/update', (req,res)=>{
  const {Id,
    ContactNumber,
    EmailAddress,
    YouthClassification,
    YouthAgeGroup,
    HighestEducationalAttainmentID,
    WorkStatus,
    KKMemberID}=req.body;

  const query = "UPDATE `kkmembers` SET `ResidentID` = ?, `YouthAgeGroup` = ?, `ContactNumber` = ?, `EmailAddress` = ?, `HighestEducationalAttainmentID` = ?, `YouthClassification`= ?,`WorkStatus` = ? WHERE `KKMemberID` = ?;";
  db.query(query,[Id,
    YouthAgeGroup,
    ContactNumber,
    EmailAddress,
    HighestEducationalAttainmentID,
    YouthClassification,
    WorkStatus,
    KKMemberID],(err,results)=>{
    if (err) {
      console.error('Error updating resident:', err);
      return res.status(500).json({ message: 'Error updating resident', error: err });
    }
    res.json({ message: 'Resident updated successfully', results });
  })
})
//getdata
router.get('/getMember/:id',(req,res)=>{
  const memberID = req.params.id ;
  const query = "SELECT * FROM `kkmembers` WHERE KKMemberID = ?";
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
//delete
router.delete('/delete/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter
    const deleteResidentQuery = "DELETE FROM kkmembers WHERE KKMemberID = ?";
    db.query(deleteResidentQuery, [residentId], (deleteResidentErr, deleteResidentResults) => {
      if (deleteResidentErr) {
        console.error("Error deleting resident:", deleteResidentErr);
        return res.status(500).json({ message: "Error deleting resident", error: deleteResidentErr });
      }

      res.json({ message: "Data deleted successfully", affectedRows: deleteResidentResults.affectedRows });
    });
});
// Get Inhabitants
router.get('/view', (req, res) => {
    const query = 'SELECT * FROM `kkmembersfull`';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});


module.exports = router;