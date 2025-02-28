const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const multer = require('multer');
const path = require('path');
app.use(bodyParser.json());

const filepath = "./routes/ordinancesData.JSON"
const filePath = path.join(__dirname, 'ordinancesData.json');

// Set up multer for file uploads

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, "../Bis-dev/public/Data");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}` );
    }
  })

const upload = multer({ storage: storage })

//file Upload
router.post('/upload', upload.array("projectImage",5), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    const { title, description } = req.body;
    //const image = `/Data/${req.file.filename}`
    //req.files.map((file)=>{`/Data/${file.filename}`})
    const image = req.files.map(item=>`/Data/${item.filename}`)
    
    
    const newProject = {
        id: Date.now(), // Unique ID based on timestamp
        title,
        description,
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
//View
router.get("/projects", (req, res) => {
    
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
      res.json(JSON.parse(data));
    });
  });
//delete
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
  router.post("/update", (req, res) => {
    
    const updatedData = req.body;
  
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
  
      try {
        const jsonData = JSON.parse(data);
  
        // Find and update the project
        const projectIndex = jsonData.findIndex(project => project.id == updatedData.id);
        if (projectIndex === -1) {
          return res.status(404).json({ message: "Project not found." });
        }
  
        jsonData[projectIndex] = { ...jsonData[projectIndex], ...updatedData };
        
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
