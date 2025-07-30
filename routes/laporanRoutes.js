const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporanController");
const upload = require("../middleware/uploadMiddleware");
const laporanValidator = require('../validator/laporanValidator');

// Use multer for file uploads
router.post("/", upload.single('photo'), laporanValidator, laporanController.createLaporan);
router.get("/", laporanController.getAllLaporan);
router.get("/user/:id_user", laporanController.getLaporanByUser);
router.get("/:id", laporanController.getLaporanDetail);
router.put("/:id", upload.single('photo'), laporanController.updateLaporan);
router.delete("/:id", laporanController.deleteLaporan);

module.exports = router;