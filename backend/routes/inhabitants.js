const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection


router.post('/filter', (req, res) => {
  const { address, sex, civilStatus, occupation, citizenship } = req.body;

  // Start with a basic query
  let query = 'SELECT * FROM barangayinhabitants WHERE 1=1'; // Always true to ensure the WHERE clause is valid
  
  // Initialize an array for query parameters
  let queryParams = [];

  // Dynamically add conditions based on available parameters
  if (sex) {
    query += ' AND Sex = ?';
    queryParams.push(sex);
  }
  if (address) {
    query += ' AND AddressID = ?';
    queryParams.push(address);
  }
  if (civilStatus) {
    query += ' AND CivilStatusID = ?';
    queryParams.push(civilStatus);
  }
  if (occupation) {
    query += ' AND OccupationID = ?';
    queryParams.push(occupation);
  }
  if (citizenship) {
    query += ' AND CitizenshipID = ?';
    queryParams.push(citizenship);
  }

  // Execute the query
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error filtering residents:', err);
      res.status(500).send('Error filtering residents');
    } else {
      res.status(200).json(results); // Return filtered results
    }
  });
});


//delete Data
router.delete('/delete/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter


    const deleteResidentQuery = "DELETE FROM barangayinhabitants WHERE ResidentID = ?";
    db.query(deleteResidentQuery, [residentId], (deleteResidentErr, deleteResidentResults) => {
      if (deleteResidentErr) {
        console.error("Error deleting resident:", deleteResidentErr);
        return res.status(500).json({ message: "Error deleting resident", error: deleteResidentErr });
      }

      res.json({ message: "Data deleted successfully", affectedRows: deleteResidentResults.affectedRows });
    });
});
//update data
router.post('/update', (req, res) => {
  const {
    resid,
    lastName,
    givenName,
    middleName,
    qualifier,
    dateOfBirth,
    address,
    placeOfBirth,
    sex,
    civilStatus,
    occupation,
    citizenship,
    status
  } = req.body; // Extract data from the request body

  const query = `
    UPDATE barangayinhabitants
    SET
      LastName = ?,
      GivenName = ?,
      MiddleName = ?,
      Qualifier = ?,
      DateOfBirth = ?,
      PlaceOfBirth = ?,
      Sex = ?,
      AddressID = ?,
      CivilStatusID = ?,
      OccupationID = ?,
      CitizenshipID = ?,
      status = ?
    WHERE ResidentID = ?`;

  db.query(
    query,
    [
      lastName,
      givenName,
      middleName,
      qualifier,
      dateOfBirth,
      placeOfBirth,
      sex,
      address,
      civilStatus,
      occupation,
      citizenship,
      status,
      resid,
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

//getData to be update
router.get('/getResident/:id', (req, res) => {
  const residentId = req.params.id; // Get the ID from the URL parameter
  const query = "SELECT * FROM `barangayinhabitants` WHERE ResidentID = ?";
  
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
router.get('/citizen', (req,res) =>{
  const query = "SELECT * FROM `citizenship`";
  db.query(query, (err, results) =>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
//Sort Down
router.get('/view', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`ResidentID` ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/view2', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`lastName` DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/view3', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`givenName` DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/view4', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`middleName` DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/view5', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`DateOfBirth` DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//sortUP
router.get('/views', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`ResidentID` DESC';
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
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`lastName` ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/views3', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`givenName` ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/views4', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`middleName` ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/views5', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(DateOfBirth, "%Y-%m-%d") AS DateOfBirth FROM `barangayinhabitantsfulls3` ORDER BY `barangayinhabitantsfulls3`.`DateOfBirth` ASC';
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
  const { lastName,
    givenName,
    middleName,
    qualifier,
    dateOfBirth,
    address,
    placeOfBirth,
    sex,
    civilStatus,
    occupation,
    citizenship } = req.body;
  const query = 'INSERT INTO `barangayinhabitants` (`LastName`, `GivenName`, `MiddleName`, `Qualifier`, `DateOfBirth`, `PlaceOfBirth`, `Sex`, `AddressID`, `CivilStatusID`, `OccupationID`, `CitizenshipID`) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
  db.query(query, [lastName,
    givenName,
    middleName,
    qualifier,
    dateOfBirth,
    placeOfBirth,
    sex,
    address,
    civilStatus,
    occupation,
    citizenship], (err, results) => {
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
router.post('/addHH',(req,res)=>{
  const {Id,
    HouseholdNumber,
    RelationID,}= req.body;
  const query = "INSERT INTO `householdmembership` (`ResidentID`, `HouseholdNumber`, `RelationID`) VALUES (?,?,?)";
  db.query(query,[Id,
    HouseholdNumber,
    RelationID,],(err,result)=>{
    if (err) {
      
      console.error('Error adding resident:', err);
      res.status(500).send(req.body);
    } else {
      res.status(201).send("asdasd")
    }
  });
});
router.post('/addSC',(req,res)=>{
  const {Id,
    SeniorCitizenNumber,
    ContactNumber,
    EmailAddress}= req.body
  const query = 'INSERT INTO `seniorcitizens` (`ResidentID`, `SeniorCitizenNumber`, `ContactNumber`, `Email`) VALUES (?, ?, ?, ?)';
  db.query(query,[Id,
    SeniorCitizenNumber,
    ContactNumber,
    EmailAddress],(err,results)=>{
      if (err) {
      
        console.error('Error adding resident:', err);
        res.status(500).send(req.body);
      } else {
        res.status(201).send("asdasd")
      }
    });
});
router.post('/addKK', (req, res) => {
  const { Id,
    ContactNumber,
    EmailAddress,
    YouthClassification,
    YouthAgeGroup,
    HighestEducationalAttainmentID,
    WorkStatus } = req.body;
  const query = 'INSERT INTO `kkmembers` (`ResidentID`, `YouthClassification`, `YouthAgeGroup`, `ContactNumber`, `EmailAddress`, `HighestEducationalAttainmentID`, `WorkStatus`) VALUES ( ?,?,?,?,?,?,?)';
  db.query(query, [Id,
    YouthClassification,
    YouthAgeGroup,
    ContactNumber,
    EmailAddress,
    HighestEducationalAttainmentID,
    WorkStatus], (err, results) => {
    if (err) {
      
      console.error('Error adding resident:', err);
      res.status(500).send(req.body);
    } else {
      res.status(201).send("asdasd")
    }
  });
});
router.get('/residentsH',(req,res) =>{
  const query = "SELECT * FROM residenttracker t1 LEFT JOIN household t2 ON t1.ResidentID = t2.HouseholdHead LEFT JOIN householdmembership t3 ON t1.ResidentID = t3.HouseholdMembershipID WHERE t2.HouseholdNumber IS NULL AND t3.HouseholdMembershipID IS NULL ORDER BY `t1`.`ResidentID` ASC";
  db.query(query, (err,results)=>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
})
router.get('/residents',(req,res) =>{
  const query = "SELECT * FROM `residenttracker`";
  db.query(query, (err,results)=>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
})
router.get('/residentsNotHouseholdHead',(req,res) =>{
  
  const query = `SELECT r.* FROM residenttracker r LEFT JOIN household h ON r.ResidentID = h.HouseholdHead
WHERE h.HouseholdHead IS NULL ORDER BY r.Name;
`;
  db.query(query, (err,results)=>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
});
router.get('/residentsNotHouseholdHeadUpdate/:id',(req,res) =>{
  const  Current  = req.params.id;
  console.log(Current)
  const query = `SELECT r.* FROM residenttracker r LEFT JOIN household h ON r.ResidentID = h.HouseholdHead WHERE h.HouseholdHead IS NULL UNION SELECT * FROM residenttracker WHERE ResidentID = ? ORDER BY Name ASC;
`;
  db.query(query,[Current], (err,results)=>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
});
router.get('/residents11',(req,res) =>{
  const query = "SELECT * FROM `barangay_inhabitants_view1`";
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