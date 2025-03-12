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