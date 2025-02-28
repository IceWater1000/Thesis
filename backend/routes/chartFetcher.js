const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection


router.get('/getSex', (req,res)=>{
    const query="SELECT sex, COUNT(*) AS count FROM `barangayinhabitants` GROUP BY sex;"
    db.query(query, (err, results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    })
});
router.get('/ageRange', (req,res)=>{
    const query = "SELECT CASE WHEN FLOOR(DATEDIFF(CURDATE(), DateOfBirth) / 365.25) < 15 THEN '0-14' WHEN FLOOR(DATEDIFF(CURDATE(), DateOfBirth) / 365.25) BETWEEN 15 AND 29 THEN '15-30' WHEN FLOOR(DATEDIFF(CURDATE(), DateOfBirth) / 365.25) BETWEEN 30 AND 59 THEN '30-60' ELSE '60+' END AS age_range, COUNT(*) AS count FROM barangayinhabitants GROUP BY age_range;"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    })
});
router.get('/civilStatus', (req,res)=>{
    const query = "SELECT CivilStatus, COUNT(*) AS count FROM barangayinhabitantsfulls1 GROUP BY CivilStatus"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    })
})
router.get('/houseInhabitantsNumber', (req,res)=>{
    const query = "SELECT TotalInhabitants, COUNT(*) AS count FROM householdsfull GROUP BY TotalInhabitants"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    })
})
module.exports = router;