const getUsers = "SELECT * FROM users";
const getUserEmail = `SELECT email FROM users WHERE email = $1`;
const getUserUsername = `SELECT username FROM users WHERE username = $1`;
const getByUsername = `SELECT * FROM users WHERE username = $1`;

const createUser = `INSERT INTO users (username, email, age, weight, height, password)
    								VALUES ($1, $2, $3, $4, $5, $6)`;

module.exports = {
	getUsers,
	getUserEmail,
	getUserUsername,
	getByUsername,
	createUser,
};
