const laporan = require("../models/laporan");
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const createLaporan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }

  try {
    const {
      id_user,
      title,
      description,
      tanggal = new Date(),
      status = "Belum di proses",
      lokasi = null,
      kategori = "organik"
    } = req.body;

    // Handle file upload
    let photoUrl = null;
    if (req.file) {
      // Create URL for the uploaded file
      photoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newLaporan = await laporan.create({
      id_user,
      title,
      description,
      photo: photoUrl,
      tanggal,
      status,
      lokasi,
      kategori
    });

    return res.status(201).json({
      success: true,
      message: 'Laporan created successfully',
      data: {
        id: newLaporan.id,
        id_user: newLaporan.id_user,
        title: newLaporan.title,
        description: newLaporan.description,
        photo: newLaporan.photo,
        status: newLaporan.status,
        createdAt: newLaporan.createdAt
      }
    });

  } catch (err) {
    console.error('Error creating laporan:', err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: 'A record with these details already exists'
      });
    }

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to create laporan'
    });
  }
};


const getLaporanByUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const userLaporan = await laporan.findAll({
      where: { id_user: id_user },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'User laporan retrieved successfully',
      data: userLaporan
    });
  } catch (err) {
    console.error('Error retrieving user laporan:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve user laporan'
    });
  }
};

const getAllLaporan = async (req, res) => {
  try {
    const laporanList = await laporan.findAll();

    return res.status(200).json({
      success: true,
      message: 'Laporan retrieved successfully',
      data: laporanList
    });
  } catch (err) {
    console.error('Error retrieving laporan:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve laporan'
    });
  }
};

const getLaporanDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const laporanDetail = await laporan.findByPk(id);

    if (!laporanDetail) {
      return res.status(404).json({
        success: false,
        message: 'Laporan not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Laporan retrieved successfully',
      data: laporanDetail
    });
  } catch (err) {
    console.error('Error retrieving laporan detail:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve laporan detail'
    });
  }
};

const updateLaporan = async (req, res) => {
  const { id } = req.params;

  try {
    const laporanToUpdate = await laporan.findByPk(id);

    if (!laporanToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Laporan not found'
      });
    }

    // Handle file upload for updates
    let photoUrl = laporanToUpdate.photo; // Keep existing photo if no new file
    if (req.file) {
      // Delete old file if it exists
      if (laporanToUpdate.photo) {
        const oldFilePath = path.join(__dirname, '../uploads', path.basename(laporanToUpdate.photo));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
      // Create URL for the new uploaded file
      photoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    // Update with new photo URL if file was uploaded
    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo = photoUrl;
    }

    const updatedLaporan = await laporanToUpdate.update(updateData);

    return res.status(200).json({
      success: true,
      message: 'Laporan updated successfully',
      data: updatedLaporan
    });
  } catch (err) {
    console.error('Error updating laporan:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to update laporan'
    });
  }
};

const deleteLaporan = async (req, res) => {
  const { id } = req.params;

  try {
    const laporanToDelete = await laporan.findByPk(id);

    if (!laporanToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Laporan not found'
      });
    }

    // Delete associated file if it exists
    if (laporanToDelete.photo) {
      const filePath = path.join(__dirname, '../uploads', path.basename(laporanToDelete.photo));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await laporanToDelete.destroy();

    return res.status(200).json({
      success: true,
      message: 'Laporan deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting laporan:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to delete laporan'
    });
  }
};

module.exports = {
  createLaporan,
  getAllLaporan,
  getLaporanByUser,
  getLaporanDetail,
  updateLaporan,
  deleteLaporan
};