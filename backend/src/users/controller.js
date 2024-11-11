const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
	try {
		const result = await pool.query(queries.getUsers);

		//Send users
		return res.status(200).json(result.rows);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "An error occurred while fetching users", error: true });
	}
};

const createUser = async (req, res) => {
	const { username, email, age, weight, height, password } = req.body;

	try {
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Check if the email already exists
		const getEmailResult = await pool.query(queries.getUserEmail, [email]);
		if (getEmailResult.rows.length > 0) {
			return res
				.status(400)
				.json({ message: "The email is in use", error: true });
		}

		// Check if the username already exists
		const getUsernameResult = await pool.query(queries.getUserUsername, [
			username,
		]);
		if (getUsernameResult.rows.length > 0) {
			return res
				.status(400)
				.json({ message: "The username is in use", error: true });
		}

		// Create the user
		const createUserResult = await pool.query(queries.createUser, [
			username,
			email,
			parseInt(age),
			parseFloat(weight),
			parseFloat(height),
			hashedPassword,
		]);

		// Send success response
		return res
			.status(201)
			.json({ message: "User created successfully", user: username });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "An error occurred while registering the user",
			error: true,
		});
	}
};

const logUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Get the user info by username
		const userResult = await pool.query(queries.getByUsername, [username]);

		// Check if user exists
		if (userResult.rows.length === 0) {
			return res.status(400).json({
				message: "The username or the password is incorrect",
				error: true,
			});
		}

		const user = userResult.rows[0];

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);

		// If it's correct, log the user in
		if (isPasswordValid) {
			// Store user info into the session object
			req.session.user = {
				user_id: user.user_id,
				username: user.username,
				age: user.age,
				weight: user.weight,
				height: user.height,
			};

			return res.status(200).json({
				message: "User logged in successfully",
				user: req.session.user,
			});
		} else {
			return res.status(400).json({
				message: "The username or the password is incorrect",
				error: true,
			});
		}
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "An error occurred while logging in", error: true });
	}
};

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Logout failed", error: true });
		}
		res.clearCookie("connect.sid"); // Clears the session ID cookie
		res.json({ message: "Logged out successfully" });
	});
};

const getProfile = (req, res) => {
	const user = req.session.user;
	if (req.session.user) {
		res.send(`Welcome to your profile, ${user.username}`);
	} else {
		res.status(403).send("You don't have access to this site, log in");
	}
};

module.exports = {
	getUsers,
	createUser,
	logUser,
	logout,
	getProfile,
};
