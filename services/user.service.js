const prisma = require("../libs/prisma");

/**
 * Finds a user by their email address.
 * @param {string} email - The email address of the user to find.
 * @return {boolean} Returns true if a user with the specified email exists, otherwise false.
 * 
*/
exports.findByUserEmail = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return true;
  return false;
}

/**
 * Creates a new user in the database.
 * @param {Object} user - An object containing the user's details (firstName, lastName, email, mobile).
 * @return {Object} Returns an object containing the created user's details (id, firstName, lastName, email, mobile, createdAt).
*/
exports.createUser = async (user) => {
  if (user) {
    const createdUser = await prisma.user.create({ data: user });
    return {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      mobile: createdUser.mobile,
      createdAt: createdUser.createdAt,
    };
  }
}

/**
 * Retrieves a user from the database by their unique identifier.
 * @param {number} userId - The unique identifier of the user to retrieve.
 * @return {Object|null} Returns an object containing the user's 
 *     details (id, firstName, lastName, email, mobile, createdAt) if found, otherwise null.
*/
exports.getUserById = async (userId) => {
  if (!userId) return;
  const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
  if (user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      createdAt: user.createdAt,
    }
  } else {
    return null;
  }
}

/**
 * Deletes a user from the database by their unique identifier.
 * @param {number} userId - The unique identifier of the user to delete.
 * @return {Object|null} Returns an object containing the 
 *       deleted user's details (id, firstName, lastName, email, mobile, createdAt) if deletion was successful, otherwise null.
*/
exports.deleteUserById = async (userId) => {
  if (!userId) return;
  const deletedUser = await prisma.user.delete({ where: { id: parseInt(userId) } });
  if (!deletedUser) return null;

  return {
    id: deletedUser.id,
    firstName: deletedUser.firstName,
    lastName: deletedUser.lastName,
    email: deletedUser.email,
    mobile: deletedUser.mobile,
    createdAt: deletedUser.createdAt,
  }
}

/**
 * Updates a user's details in the database by their unique identifier.
 * @param {Object} user - An object containing the user's updated details (id, firstName, lastName, email, mobile);
 * @return {Object|null} Returns an object containing the updated user's details (id, firstName, lastName, email, mobile, createdAt) if update was successful, otherwise null.
*/
exports.updateUserById = async (user) => {
  if (!user || !user.id) return;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(user.id) },
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    }
  })

  if (!updatedUser) return null;

  return {
    id: updatedUser?.id,
    firstName: updatedUser?.firstName,
    lastName: updatedUser?.lastName,
    email: updatedUser?.email,
    mobile: updatedUser?.mobile,
    createdAt: updatedUser?.createdAt,
  }
}

/**
 * Retrieves all users from the database.
 * @return {Array} Returns an array of objects, each containing a user's details (id, firstName, lastName, email, mobile, createdAt).
*/
exports.getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
    createdAt: user.createdAt,
  }));
}