const getUsers = "SELECT * FROM users";
const getUserById = `SELECT * FROM users WHERE user_id = $1`;
const getUserEmail = `SELECT email FROM users WHERE email = $1`;
const getUserUsername = `SELECT username FROM users WHERE username = $1`;
const getByUsername = `SELECT * FROM users WHERE username = $1`;

const createUser = `INSERT INTO users (username, email, age, weight, height, password)
    								VALUES ($1, $2, $3, $4, $5, $6)`;

const changePassword = `UPDATE users
												SET password = $1
												WHERE user_id = $2`;

module.exports = {
	getUsers,
	getUserById,
	getUserEmail,
	getUserUsername,
	getByUsername,
	createUser,
	changePassword,
};
