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

    const Image = `/Data3/${req.file.filename}`;
    const ID = Date.now();
    
    const newBarangayImage = {
        ID,
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
            
            let Images = null;
            
            try {
                Images = JSON.parse(data); // Parse the JSON data
            } catch (err) {
                console.error('Error parsing HomeDashboardData.json:', err);
                return;
            }
    
            // Add the new project to the array
            Images.IntroductionImageLabel.push(newBarangayImage);
            res.json(Images);
            // Write the updated array back to products.json
            fs.writeFile(filePath, JSON.stringify(Images, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Failed to write to HomeDashboardData.json:', err);
                    return;
                }
    
                console.log('New Barangay Image added successfully!');
            });
        });
    }
    addNewBarangayImage(newBarangayImage);
    
 });

 // for Deleting BarangayImage
 router.get("/delete/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read the file." });
      }
  
      let carouselData = JSON.parse(data);
      carouselData.IntroductionImageLabel = carouselData.IntroductionImageLabel.filter((project) => project.ID !== projectId);

      
      // Write the updated data back to the JSON file
      fs.writeFile(filePath, JSON.stringify(carouselData, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to write the file." });
        }
        res.status(200).json({ message: "Project deleted successfully." });
      });
    });
  });
router.get("/getData", (req, res)=>{
   let ImageCarouselData = [];

   fs.readFile(filePath, "utf8",  (err, data)=>{
   if (err){
    return res.status(500).json({message: "error Opening File on the backend"});
   }

   res.json(JSON.parse(data));
   
    })
});

router.post("/EditNumbers", (req,res)=>{
    const {numbersLabel} = req.body

    fs.readFile(filePath, "utf8", (err, data)=>{
        if(err){
            return res.status(500).json({message: "Error in Opening the File"})
        };
        let newData = JSON.parse(data);

        newData.Numbers = numbersLabel;

        
        console.log(newData.Numbers);
        fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8', (err)=>{
            if (err){
                console.error('Failed to write to HomeDashboardData.json:', err);
                    return;
            };
            console.log("Successfull");
        });

        res.json({message: "SUCCESSFULL"});
        
    })

});


module.exports = router;