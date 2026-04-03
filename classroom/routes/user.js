const express = require("express");
const router = express.Router();

// Index - User
router.get("/", (req, res) => {
  res.send("GET for Users");
});

// Show - User
router.get("/:id", (req, res) => {
  res.send("GET for id");
});

// Post - User
router.post("/", (req, res) => {
  res.send("POST for users");
});

// Delete - Router
router.delete("//:id", (req, res) => {
  res.send("DELETE for user id");
});

module.exports = router;