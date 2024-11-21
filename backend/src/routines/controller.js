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
		return res
			.status(200)
			.json({ routines: routinesResults.rows, error: false });
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
		return res
			.status(200)
			.json({ routines: routinesResults.rows, error: false });
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
		// Check if there is a routine with the name or the day
		const conflictResult = await pool.query(queries.checkRoutineConflicts, [
			user.user_id,
			name,
			day,
		]);

		if (conflictResult.rows.length > 0) {
			const conflict = conflictResult.rows[0];
			return res.status(409).json({
				message: `Conflict: A routine named "${conflict.name}" or assigned to day ${conflict.day} already exists.`,
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
			.json({ message: "Routine created successfully", error: false });
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
			.status(204)
			.json({ message: "Routine deleted successfully", error: false });
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
			.json({ message: "Routine's name updated successfully", error: false });
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
			.json({ message: "Routine's day updated successfully", error: false });
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
