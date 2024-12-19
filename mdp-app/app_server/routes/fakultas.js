var express = require("express");
var router = express.Router();

// impor controller
const fakultasController = require("../controllers/fakultasController");

/* GET list fakultas.*/
router.get("/", fakultasController.index);

module.exports = router;