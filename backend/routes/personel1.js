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
        console.log(results);
        res.json(results);
      }
    })
    
  });
//Specific
router.get("/specific/:id", (req, res) => {
    const projectId = req.params.id;
  
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
  
      try {
        const jsonData = JSON.parse(data);
        
        // Find and update the project
        const projectIndex = jsonData[0].officials.findIndex(project => project.id == projectId);
        if (projectIndex === -1) {
          return res.status(404).json({ message: "Project not found." });
        }
  
        res.json(jsonData[0].officials[projectIndex]);
        
        
        
      } catch (err) {
        return res.status(500).json({ message: "Failed to parse JSON data." });
      }
    });
  });
  //updating
router.post('/update', upload.single("personImage"), function (req, res) {

    const {id,name,position,other} = req.body;
    
    const image = `/Data2/${req.file.filename}`
    const newProject = {id,name,position,other,image};
    
    
    
    fs.readFile(filepath, "utf8", (err, data) => {
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
    });
    
  });
  module.exports = router;
