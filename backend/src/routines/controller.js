const pool = require("../../db");
const queries = require("./queries");

const getRoutines = async (req, res) => {
	try {
		const routinesResults = await pool.query(queries.getRoutines);

		// If no routine is found
		if (routinesResults.rows.length === 0) {
			res
				.status(400)
				.json({ message: "Couldn't get any routine", error: true });
		}

		// Else return the obtained routines
		return res.status(200).json(routinesResults.rows);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Error while getting the routines", error: true });
	}
};

const getRoutinesByUser = async (req, res) => {
	const user = req.session.user;

	try {
		// Check if user is logged in
		if (user) {
			// Get the user's routines
			const routinesResults = await pool.query(queries.getRoutinesByUser, [
				user.user_id,
			]);

			// If he doesn't have any, return an error
			if (routinesResults.rows.length === 0) {
				return res.status(400).json({
					message: "You don't have any routine, create one to see it here",
					error: true,
				});
			}

			// Else return the routines
			return res.status(200).json(routinesResults.rows);
		} else {
			//If he isn't logged in, send an error
			return res.status(401).json({
				message: "You need to log in to see your routines!",
				error: true,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the routines for this user",
			error: true,
		});
	}
};

const createRoutine = async (req, res) => {
	const user = req.session.user;
	const { name, day } = req.body;

	try {
		if (user) {
			// Check if there is a routine with the name
			const routineNamesResults = await pool.query(queries.checkRoutinesName, [
				user.user_id,
				name,
			]);
			if (routineNamesResults.rows.length > 0) {
				return res.status(404).json({
					message: "There is a routine with that name. Change it",
					error: true,
				});
			}

			// Check if there is another routine for that day
			const checkDayResults = await pool.query(queries.checkRoutinesDay, [
				user.user_id,
				day,
			]);
			if (checkDayResults.rows.length > 0) {
				return res.status(404).json({
					message: `Routine ${checkDayResults.rows[0].name} has that day associated to it`,
					error: true,
				});
			}

			// If there is no routine, create the new one
			const createRoutineResults = await pool.query(queries.createRoutine, [
				user.user_id,
				name,
				day,
			]);

			// Return a message when routine is created
			return res
				.status(201)
				.json({ message: "Routine created successfully", routine: name });
		} else {
			//If user isnt logged in, send an error
			return res.status(401).json({
				message: "You need to log in to create a routine",
				error: true,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while creating the routine",
			error: true,
		});
	}
};

const deleteRoutine = async (req, res) => {
	const user = req.session.user;
	const { routineId } = req.body;

	try {
		// Check if the user is logged in
		if (!user) {
			return res.status(401).json({
				message: "You can't delete a routine since you aren't logged in!",
				error: true,
			});
		}

		// Check if the routine is from the user
		const userRoutine = await pool.query(queries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);
		if (userRoutine.rows.length === 0) {
			return res.status(401).json({
				message: "This isn't a routine that you have created!",
				error: true,
			});
		}

		// If everything is correct, delete the routine
		const deleteResult = await pool.query(queries.deleteRoutine, [routineId]);
		return res
			.status(201)
			.json({ message: "Routine deleted successfully", routineId });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while deleting the routine",
			error: true,
		});
	}
};

const changeRoutineName = async (req, res) => {
	const user = req.session.user;
	const { name, routineId } = req.body;

	try {
		// If user isn't logged in throw an error
		if (!user) {
			return res.status(401).json({
				message: "You can't update a routine since you aren't logged in!",
				error: true,
			});
		}

		// Check if the routine is from the user
		const userRoutine = await pool.query(queries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);

		if (userRoutine.rows.length === 0) {
			return res.status(401).json({
				message: "This isn't a routine that you have created!",
				error: true,
			});
		}

		// If there is no error, update the routine's name
		const changeRoutineResult = await pool.query(queries.updateRoutineName, [
			name,
			routineId,
		]);

		return res
			.status(201)
			.json({ message: "Routine's name updated successfully", routineId });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while updating the name of the routine",
			error: true,
		});
	}
};

const changeRoutineDay = async (req, res) => {
	const user = req.session.user;
	const { day, routineId } = req.body;

	try {
		// If user isn't logged in throw an error
		if (!user) {
			return res.status(401).json({
				message: "You can't update a routine since you aren't logged in!",
				error: true,
			});
		}

		// Check if the routine is from the user
		const userRoutine = await pool.query(queries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);

		if (userRoutine.rows.length === 0) {
			return res.status(401).json({
				message: "This isn't a routine that you have created!",
				error: true,
			});
		}

		// If there is no error, update the routine's day
		const changeRoutineResult = await pool.query(queries.updateRoutineDay, [
			day,
			routineId,
		]);

		return res
			.status(201)
			.json({ message: "Routine's day updated successfully", routineId });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while updating the day of the routine",
			error: true,
		});
	}
};

module.exports = {
	getRoutines,
	getRoutinesByUser,
	createRoutine,
	changeRoutineName,
	changeRoutineDay,
	deleteRoutine,
};
