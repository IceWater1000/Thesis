const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection
//update
router.post('/update',(req,res)=>{
  const {
    HouseholdNumber,
    HouseholdMembershipID,
    RelationID,
    ResidentID,
    } = req.body;
  const query = "UPDATE householdmembership SET ResidentID = ?, HouseholdNumber = ?, RelationID = ? WHERE HouseholdMembershipID = ?;";
  db.query(query,[
    ResidentID,
    HouseholdNumber,
    RelationID,
    HouseholdMembershipID,
  ],(err,results)=>{
      if (err) {
        console.error('Error updating resident:', err);
        return res.status(500).json({ message: 'Error updating resident', error: err });
      }
      res.json({ message: 'Resident updated successfully', results });
    })
})
//delete HousholdMember
router.delete('/delete/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter


    const deleteResidentQuery = "DELETE FROM householdmembership WHERE HouseholdMembershipID = ?";
    db.query(deleteResidentQuery, [residentId], (deleteResidentErr, deleteResidentResults) => {
      if (deleteResidentErr) {
        console.error("Error deleting resident:", deleteResidentErr);
        return res.status(500).json({ message: "Error deleting resident", error: deleteResidentErr });
      }

      res.json({ message: "Data deleted successfully", affectedRows: deleteResidentResults.affectedRows });
    });
});
// Get Inhabitants
router.get('/getMember/:id',(req,res)=>{
  const memberID = req.params.id 
  const query = "SELECT * FROM `householdmembership` WHERE HouseholdMembershipID = ?"
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
router.get('/view', (req, res) => {
    const query = 'SELECT *,DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `householdmembers2`';
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