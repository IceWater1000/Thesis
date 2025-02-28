const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const multer = require('multer');
const path = require('path');
app.use(bodyParser.json());

const filepath = "./routes/personel2.JSON"
const filePath = path.join(__dirname, 'personel2.json');

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
    
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
      res.json(JSON.parse(data));
    });
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
        const projectIndex = jsonData.findIndex(project => project.id == projectId);
        if (projectIndex === -1) {
          return res.status(404).json({ message: "Project not found." });
        }
  
        res.json(jsonData[projectIndex]);
        
        
        
      } catch (err) {
        return res.status(500).json({ message: "Failed to parse JSON data." });
      }
    });
  });

  //updating
router.post('/update', upload.single("personImage"), function (req, res) {

    const {id,name,position,other} = req.body;
    
    const image = `/Data2/${req.file.filename}`
    const newProject = {id: Number(id),name,position,other,image};
    
    
    
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
      
      
      try {
        const jsonData = JSON.parse(data);
  
        // Find and update the project
        const projectIndex = jsonData.findIndex(project => project.id == id);
        if (projectIndex === -1) {
          return res.status(404).json({ message: "Project not found." });
        }
  
        jsonData[projectIndex] = { ...jsonData[projectIndex], ...newProject };

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
  
  // for adding
router.post('/upload', upload.single("personImage"), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    const { name, other } = req.body;
    //const image = `/Data/${req.file.filename}`
    //req.files.map((file)=>{`/Data/${file.filename}`})
    const image = `/Data2/${req.file.filename}`
    
    
    const newProject = {
        id: Date.now(), // Unique ID based on timestamp
        name,
        other,
        image,
      };
    
    function addNewProject(newProject) {
        // Read the current contents of the products.json file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read products.json:', err);
                return;
            }
            
            let projects = [];
            
            try {
                projects = JSON.parse(data); // Parse the JSON data
            } catch (err) {
                console.error('Error parsing products.json:', err);
                return;
            }
    
            // Add the new project to the array
            projects.push(newProject);
            res.json(projects);
            // Write the updated array back to products.json
            fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Failed to write to products.json:', err);
                    return;
                }
    
                console.log('New project added successfully!');
            });
        });
    }
    addNewProject(newProject);
    
 });
 //for deleting
router.get("/delete/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
  
      let projects = JSON.parse(data);
      const updatedProjects = projects.filter((project) => project.id !== projectId);
  
      // Write the updated data back to the JSON file
      fs.writeFile(filepath, JSON.stringify(updatedProjects, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to write the file." });
        }
        res.status(200).json({ message: "Project deleted successfully." });
      });
    });
  });
module.exports = router;
