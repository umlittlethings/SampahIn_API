const laporan = require("../models/laporan");
const { validationResult } = require('express-validator');

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
      photo = null,
      tanggal = new Date(),
      status = "Belum di proses",
      lokasi = null,
      kategori = "organik"
    } = req.body;

    const newLaporan = await laporan.create({
      id_user,
      title,
      description,
      photo,
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

    const updatedLaporan = await laporanToUpdate.update(req.body);

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
  getLaporanDetail,
  updateLaporan,
  deleteLaporan
};
