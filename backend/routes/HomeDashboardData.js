const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const multer = require('multer');
const path = require('path');
const { data } = require('react-router-dom');
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'HomeDashboardData.json');
 
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       
       cb(null, "../Bis-dev/public/Data3");
   },
   filename: function (req, file, cb) {
       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}` );
   }
 })
 
const upload = multer({ storage: storage })

// for adding BarangayImage
router.post('/uploadBarangayImage', upload.single("barangayImage"), function (req, res) {
   
    const { Label} = req.body;

    const Image = `/Data2/${req.file.filename}`
    
    
    const newBarangayImage = {
       Image,
       Label
      };
    
    function addNewBarangayImage(newBarangayImage) {
        // Read the current contents of the products.json file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read HomeDashboardData.json:', err);
                return;
            }
            
            let Images = [];
            
            try {
                projects = JSON.parse(data); // Parse the JSON data
            } catch (err) {
                console.error('Error parsing HomeDashboardData.json:', err);
                return;
            }
    
            // Add the new project to the array
            Images.push(newBarangayImage);
            res.json(Images);
            // Write the updated array back to products.json
            fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Failed to write to HomeDashboardData.json:', err);
                    return;
                }
    
                console.log('New Barangay Image added successfully!');
            });
        });
    }
    addNewProject(newProject);
    
 });

router.get("/getData", (req, res)=>{
   let ImageCarouselData = [];

   fs.readFile(filePath, "utf8",  (err, data)=>{
   if (err){
    return res.status(500).json({message: "error Opening File on the backend"});
   }

   res.json(JSON.parse(data));
   
})


})


module.exports = router;