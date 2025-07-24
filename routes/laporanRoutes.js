const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporanController");
//const authMiddleware = require("../middleware/authMiddleware");
const laporanValidator = require('../validator/laporanValidator');

router.post("/", laporanValidator, laporanController.createLaporan);
router.get("/", laporanController.getAllLaporan);
router.get("/:id", laporanController.getLaporanDetail);
router.put("/:id", laporanController.updateLaporan);
router.delete("/:id", laporanController.deleteLaporan);

module.exports = router;
