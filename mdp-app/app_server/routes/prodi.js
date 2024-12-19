// routes/prodi.js
var express = require('express');
var router = express.Router();

// Import controller
const prodiController = require('../controllers/prodiController');

// Route to display the list of programs (prodi)
router.get("/", prodiController.index);

module.exports = router;
