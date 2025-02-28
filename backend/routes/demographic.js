const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection



router.get('/totalResident',(req,res)=>{
    const query = "SELECT COUNT(*) AS total_inhabitants FROM barangayinhabitants;"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
          } else {
            res.json(results);
            console.log(res);
          }
    })
});
router.get('/totalHouse',(req,res)=>{
    const query = "SELECT COUNT(*) AS total_houses FROM household;"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
          } else {
            res.json(results);
            console.log(res);
          }
    })
});
router.get('/totalYouthResident',(req,res)=>{
    const query = "SELECT COUNT(*) AS total_youth FROM kkmembers;"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
          } else {
            res.json(results);
            console.log(res);
          }
    })
});
router.get('/totalSenior',(req,res)=>{
    const query = "SELECT COUNT(*) AS total_senior FROM seniorcitizens;"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
          } else {
            res.json(results);
            console.log(res);
          }
    })
});
router.get('/aveHoushold',(req,res)=>{
    const query = "SELECT AVG(TotalInhabitants) AS average_Houshold FROM household;"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
          } else {
            res.json(results);
            console.log(res);
          }
    })
});
router.get('/aveAge',(req,res)=>{
    const query = "SELECT AVG(FLOOR(DATEDIFF(CURDATE(), DateOfBirth) / 365.25)) AS average_age FROM barangayinhabitants"
    db.query(query, (err,results)=>{
        if (err) {
            console.error('Error fetching residents:', err);
            res.status(500).send(err);
          } else {
            res.json(results);
            console.log(res);
          }
    })
});



module.exports = router;