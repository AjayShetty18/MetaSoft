const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const winston = require("winston");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// File to store feedback
const feedbackFile = path.join(__dirname, "feedback.json");

// Get all feedback
app.get("/feedback", (req, res) => {
  fs.readFile(feedbackFile, "utf8", (err, data) => {
    if (err) {
      logger.error("Error reading feedback file", err);
      return res.status(500).json({ message: "Error reading feedback" });
    }
    res.json(JSON.parse(data || "[]"));
  });
});

// Save new feedback
app.post("/feedback", (req, res) => {
  const newFeedback = req.body;

  fs.readFile(feedbackFile, "utf8", (err, data) => {
    let feedbacks = [];
    if (!err && data) {
      feedbacks = JSON.parse(data);
    }
    feedbacks.push(newFeedback);

    fs.writeFile(feedbackFile, JSON.stringify(feedbacks, null, 2), (err) => {
      if (err) {
        logger.error("Error saving feedback", err);
        return res.status(500).json({ message: "Error saving feedback" });
      }
      logger.info("Feedback saved");
      res.json({ message: "Feedback saved successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(` Backend running at http://localhost:${PORT}`);
});
