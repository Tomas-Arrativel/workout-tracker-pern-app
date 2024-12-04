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
	// Destroy the session
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

	try {
		// If the user is logged in, the user object shouldn't be empty
		if (user) {
			res.status(200).json({ user });
		} else {
			res.status(401).json({ message: "Access denied. Please log in." });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "An error occurred while getting the profile",
			error: true,
		});
	}
};

const changePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	try {
		const user = req.session.user;

		if (user) {
			// Obtaining hashed password from the database
			const getUserResults = await pool.query(queries.getUserById, [
				user.user_id,
			]);
			const userDb = getUserResults.rows[0];

			// Check if the password is the same as the registered one
			const isPasswordValid = await bcrypt.compare(
				oldPassword,
				userDb.password
			);

			// If it is correct,
			if (isPasswordValid) {
				// and if the new password isn't null or length isn't lower than 4
				if (newPassword !== null && newPassword.length >= 4) {
					// change the password
					const encryptedPassword = await bcrypt.hash(newPassword, 10);

					// Change password query
					const changeResults = await pool.query(queries.changePassword, [
						encryptedPassword,
						user.user_id,
					]);

					return res
						.status(200)
						.json({ message: "Password changed successfully" });
				} else {
					// Length lower than 4
					return res.status(400).json({
						message: "Password must be at least 4 characters long",
						error: true,
					});
				}
			} else {
				// Password not correct
				return res
					.status(400)
					.json({ message: "Invalid password, please try again", error: true });
			}
		} else {
			// User not logged in
			return res.status(401).json({
				message: "You need to log in to change your password",
				error: true,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "An error occurred while changing the password",
			error: true,
		});
	}
};

const checkAuth = (req, res) => {
	if (req.session.userId) {
		res.json({ isAuthenticated: true });
	} else {
		res.json({ isAuthenticated: false });
	}
};

module.exports = {
	getUsers,
	createUser,
	logUser,
	logout,
	getProfile,
	changePassword,
	checkAuth,
};
