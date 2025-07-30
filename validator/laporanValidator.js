const { body } = require('express-validator');
const laporanValidator = [
  body('id_user').notEmpty().withMessage('User ID is required'),
  body('title').notEmpty().withMessage('Title is required')
    .isLength({ max: 50 }).withMessage('Title too long'),
  body('description').notEmpty().withMessage('Description is required')
  .isLength({ max: 255 }).withMessage('Description too long'),
  body('tanggal').optional().isISO8601().withMessage('Invalid date format'),
  body('status').optional().isIn(['Belum di proses', 'Proses', 'Selesai']),
  body('kategori').optional().isIn(['organik', 'anorganik', 'b3']),
  body('lokasi').optional().isString()
];
module.exports = laporanValidator;