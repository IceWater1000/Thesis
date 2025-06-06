const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const multer = require('multer');
const path = require('path');
app.use(bodyParser.json());
const db = require('../db'); // Import db connection


const filepath = "./routes/personel1.JSON"
const filePath = path.join(__dirname, 'personel1.json');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      
      cb(null, "../Bis-dev/public/Data2");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}` );
  }
})

const upload = multer({ storage: storage })

//View
router.get("/view", (req, res) => {
    
    const query = "SELECT * FROM officialsview"
    db.query(query, (err,results)=>{
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      }else {
      
        res.json(results);
      }
    })
    
  });
router.get("/personelview", (req, res) => {
    
    const query = "SELECT * FROM personelview"
    db.query(query, (err,results)=>{
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      }else {
      
        res.json(results);
      }
    })
    
  });

//Specific
router.get("/specific/:id", (req, res) => {
    const projectId = req.params.id;
     const query = "SELECT * FROM officialsview WHERE id = ?"
    db.query(query,[projectId], (err,results)=>{
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      }else {
        
        res.json(results);
      }
    })
    
    
  });
router.get("/specificpersonel/:id", (req, res) => {
    const projectId = req.params.id;
     const query = "SELECT * FROM personelview WHERE id = ?"
    db.query(query,[projectId], (err,results)=>{
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      }else {
        
        res.json(results);
      }
    })
    
    
  });
  //updating
router.post('/update', upload.single("personImage"), function (req, res) {
    
     let { id, residentID, position, other, image } = req.body;

    // If a new image was uploaded, update the image path
    if (req.file?.filename) {
        image = `/Data2/${req.file.filename}`;
    }

    const query = "UPDATE officials SET ResidentID = ?, position = ?, other = ?, image = ? WHERE id = ?";

    db.query(query, [residentID, position, other, image, id], (err, result) => {
        if (err) {
            console.error('Error updating resident:', err);
            res.status(500).send(err); // ✅ correctly using Express `res`
        } else {
            res.json({ message: 'Resident updated successfully', result }); // ✅ also correct
        }
    });
    
    /*fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
      
      
      try {
        const jsonData = JSON.parse(data);
  
        // Find and update the project
        const projectIndex = jsonData[0].officials.findIndex(project => project.id == id);
        if (projectIndex === -1) {
          return res.status(404).json({ message: "Project not found." });
        }
  
        jsonData[0].officials[projectIndex] = { ...jsonData[0].officials[projectIndex], ...newProject };

        res.json(jsonData)
        
        // Write the updated data back to the file
        fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            return res.status(500).json({ message: "Failed to update the file." });
          }
          
        });
      } catch (err) {
        return res.status(500).json({ message: "Failed to parse JSON data." });
      }
    }); */
    
    
  });

router.post('/personelupdate', upload.single("personImage"), function (req, res) {
    
     let { id, ResidentID, type, image } = req.body;

    // If a new image was uploaded, update the image path
    if (req.file?.filename) {
        image = `/Data2/${req.file.filename}`;
    }

    const query = "UPDATE `personel` SET `ResidentID` = ?, type = ?, image=?  WHERE `personel`.`id` = ?;";

    db.query(query, [ResidentID, type, image, id], (err, result) => {
        if (err) {
            console.error('Error updating resident:', err);
            res.status(500).send(err); // ✅ correctly using Express `res`
        } else {
            res.json({ message: 'Resident updated successfully', result }); // ✅ also correct
        }
    });
    
  
  });
router.post('/personel_upload', upload.single("personImage"), function (req, res) {
   
    let { ResidentID, type, image } = req.body;
    
    if (req.file?.filename) {
        image = `/Data2/${req.file.filename}`;
    }

    const query = "INSERT INTO `personel` (`ResidentID`, `type`, `image`) VALUES (?,?,?);"
    db.query(query, [ResidentID, type, image], (err, result)=>{
      if (err) {
            console.error('Error updating resident:', err);
            res.status(500).send(err); // ✅ correctly using Express `res`
        } else {
            res.json({ message: 'Resident updated successfully', result }); // ✅ also correct
        }
    })
    
})
router.get("/skview", (req, res) => {
    
    const query = "SELECT * FROM skview"
    db.query(query, (err,results)=>{
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      }else {
      
        res.json(results);
      }
    })
    
  });
  router.get("/specificsk/:id", (req, res) => {
    const projectId = req.params.id;
     const query = "SELECT * FROM skview WHERE id = ?"
    db.query(query,[projectId], (err,results)=>{
      if (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send(err);
      }else {
        
        res.json(results);
      }
    })
    
    
  });
router.post('/updatesk', upload.single("personImage"), function (req, res) {
    
     let { id, residentID, image } = req.body;

    // If a new image was uploaded, update the image path
    if (req.file?.filename) {
        image = `/Data2/${req.file.filename}`;
    }

    const query = "UPDATE sk SET ResidentID = ?, image = ? WHERE id = ?";

    db.query(query, [residentID, image, id], (err, result) => {
        if (err) {
            console.error('Error updating resident:', err);
            res.status(500).send(err); // ✅ correctly using Express `res`
        } else {
            res.json({ message: 'Resident updated successfully', result }); // ✅ also correct
        }
    });
    
    
    
    
  });
router.get('/residentsNotOfficials/:id',(req,res) =>{
  
  const Current = req.params.id;
  
  const query = `SELECT r.* 
    FROM residenttracker r
    LEFT JOIN officials o ON r.ResidentID = o.ResidentID
    LEFT JOIN sk s ON r.ResidentID = s.ResidentID
    LEFT JOIN personel p ON r.ResidentID = p.ResidentID
    WHERE o.ResidentID IS NULL AND s.ResidentID IS NULL AND p.ResidentID IS NULL

    UNION

    SELECT * 
    FROM residenttracker 
    WHERE ResidentID = ? 

    ORDER BY Name;
`;
  db.query(query, [Current], (err,results)=>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
});
router.get('/residentsisofficial',(req,res) =>{
  
  const Current = req.params.id;
  
  const query = `SELECT r.*
FROM residenttracker r
INNER JOIN officials o ON r.ResidentID = o.ResidentID
ORDER BY r.Name;

`;
  db.query(query, [Current], (err,results)=>{
    if (err) {
      console.error('Error fetching residents:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
});
router.get("/delete/:id", (req, res) => {
    const projectId = parseInt(req.params.id);

    const query = "DELETE FROM `personel` WHERE `personel`.`id` = ?"
    db.query(query, projectId, (err,results)=>{
    if (err) {
      console.error("Error fetching residents:", err);
      res.status(500).send(err);

    } else {
      res.json(results);
    } 
    })
})
module.exports = router;