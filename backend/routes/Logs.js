const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const filePath = path.join(__dirname, 'Logs.txt');

router.post("/Add", (req, res) => {
  const { user, action } = req.body;

  // Basic validation
  if (!user || !action) {
    return res.status(400).json({ message: "Missing user or action in request body." });
  }

  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${user} -- ${action}\n`;

  
  fs.appendFile(filePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
      return res.status(500).json({ message: "Failed to write to log file." });
    }

    return res.status(200).json({ message: "Log entry added successfully." });
  });
});
router.get("/GetAll", (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read log file:', err);
      return res.status(500).json({ message: "Failed to read log file." });
    }

    const logs = data.split('\n').filter(line => line.trim() !== '');

    return res.status(200).json({ logs });
  });
});
module.exports = router;
