const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;
  if (!firstName || !lastName || !email || !mobile || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'All fields are required, please provide firstName, lastName, email, mobile, and password.'
      });
  }

  let isEmailExist = await userService.findByUserEmail(email);

  if (isEmailExist) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Email already exists, please use a different email.'
      });
  }

  const createdUser = await userService
    .createUser({ firstName, lastName, email, mobile, password });

  if (createdUser) {
    return res
      .status(201)
      .json({
        success: true,
        data: createdUser, message: 'User created successfully.'
      });
  }

  return res
    .json({ success: false, message: 'Failed to create user.' });
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'User ID is required.' });
  }
  const user = await userService.getUserById(id);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: 'User not found.' });
  }
  return res
    .status(200)
    .json({
      success: true,
      data: user, message: 'User retrieved successfully.'
    });
}

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'User ID is required.' });
  }

  const isFound = await userService.getUserById(id);
  console.log(isFound);

  if (isFound !== null) {
    const deletedUser = await userService.deleteUserById(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    }
    return res
      .status(200)
      .json({ success: true, message: 'User deleted successfully.' });
  }
  return res
    .status(404)
    .json({ success: false, message: 'User not found.' });
}

exports.updateUserById = async (req, res) => {
  const { id, firstName, lastName, email, mobile } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'User ID is required.' });
  }

  const isFound = await userService.getUserById(id);

  if (isFound !== null) {
    const updatedUser = await userService.updateUserById({ id, firstName, lastName, email, mobile });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    }
    return res
      .status(200)
      .json({ success: true, data: updatedUser, message: 'User updated successfully.' });
  } else {
    return res
      .status(404)
      .json({ success: false, message: 'User not found.' });
  }
}

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res
    .status(200)
    .json({ success: true, data: users, message: 'Users retrieved successfully.' });
}