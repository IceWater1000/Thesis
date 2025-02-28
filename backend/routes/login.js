const express = require('express');
const router = express.Router();
const db = require('../db'); // Import db connection
const bcrypt = require('bcrypt');


// Hash the password using bcrypt
/*
const username = 'official1';
const password = 'official1';
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    // Now, you can insert the username and hashed password into the database
    const query = "INSERT INTO `users` (username, password, userTrueName, position, usertype) VALUES (?, ?,?,?,?)";
    db.query(query, [username, hashedPassword, "VinceOraya","BarangayOfficial","official"], (err, result) => {
        if (err) {
            console.error('Error storing admin user:', err);
            return;
        }
        console.log('Admin user created successfully');
    });
});*/
router.post('/add', (req,res)=>{
  const {
    username,
    usertype,
    password,
} = req.body;
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
      console.error('Error hashing password:', err);
      return;
  }
  const query = "INSERT INTO `users` (username, password, usertype) VALUES (?,?,?)";
  db.query(
    query,
    [ 
        username,
        hashedPassword,
        usertype,     
    ],
    (err, results) => {
      if (err) {
        console.error('Error updating resident:', err);
        return res.status(500).json({ message: id, error: err, });
      }
      res.json({ message: 'Resident updated successfully', results });
    }
  );
})
})
router.post('/update', (req, res) => {
    const {
        id,
        username,
        usertype,
        password,
    } = req.body; // Extract data from the request body
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }
    
        // Now, you can insert the username and hashed password into the database
        const query = `
        UPDATE users
        SET 
          username = ?,
          usertype = ?,
          password = ?
        WHERE id = ?`;
        db.query(
            query,
            [                
                username,
                usertype,
                hashedPassword,
                id,
            ],
            (err, results) => {
              if (err) {
                console.error('Error updating resident:', err);
                return res.status(500).json({ message: id, error: err, });
              }
              res.json({ message: 'Resident updated successfully', results });
            }
          );
    }); 
  });
router.post('/update2', (req, res) => {
    const {
        id,
        username,
        usertype,
    } = req.body; // Extract data from the request body
        // Now, you can insert the username and hashed password into the database
    const query = `
        UPDATE users SET username = ?, usertype = ? WHERE id = ?`;
    db.query(query,
            [                
                username,
                usertype,
                id,
            ],
            (err, results) => {
              if (err) {
                console.error('Error updating resident:', err);
                return res.status(500).json({ message: id, error: err, });
              }
              res.json({ message: 'Resident updated successfully', results });
            }
          );
    }); 
router.delete('/delete/:id', (req, res) => {
  const params = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [params], (err, results)=>{
    if (err){
      console.error("Error deleting resident:", err);
        return res.status(500).json({ message: "Error deleting resident", error: err });
    }
    res.json({ message: "Data deleted successfully", affectedRows: results.affectedRows });
  });
});
router.get('/view/:id',(req,res)=>{
    const memberID = req.params.id ;
    const query = "SELECT * FROM `users` WHERE id = ?";
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
router.get('/viewThisAccount/:id',(req,res)=>{
  const params = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?"
  db.query(query, [params], (err,results)=>{
    if (err){
      console.log("error on backend ")
    } else{
      res.json(results[0]);
    }
  })
})
router.get('/viewAccount',(req,res)=>{
  const query = "SELECT * FROM `users`";
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
})
router.post('/enter', async (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM `users` WHERE username = ?";
    
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.json({ login: false, message: 'Invalid username or password' });
        }

        const hashedPassword = results[0].password;

        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (isMatch) {
                res.json({ login: true,data: results[0]});
            } else {
                res.json({ login: false, message: 'Invalid username or password' });
            }
        });
    });
});

  

module.exports = router;