const user = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ['id', 'name', 'birthdate', 'phone', 'email', 'role', 'createdAt', 'updatedAt']
    });

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (err) {
    console.error('Error retrieving users:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve users'
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await user.findByPk(id, {
      attributes: ['id', 'name', 'birthdate', 'phone', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: userData
    });
  } catch (err) {
    console.error('Error retrieving user:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve user'
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, birthdate } = req.body;

  try {
    const userToUpdate = await user.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updatedUser = await userToUpdate.update({
      name,
      email,
      phone,
      birthdate
    });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        birthdate: updatedUser.birthdate,
        role: updatedUser.role,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to update user'
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await user.findByPk(id);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from being deleted
    if (userToDelete.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin user'
      });
    }

    await userToDelete.destroy();

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to delete user'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};