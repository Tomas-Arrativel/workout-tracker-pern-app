const pool = require("../../db");
const queries = require("./queries");
const routinesQueries = require("../routines/queries");

const userWorkouts = async (req, res) => {
	const user = req.session.user;

	try {
		// Check if the user has any workout loaded and if he does, return it
		const workoutsResults = await pool.query(queries.getWorkouts, [
			user.user_id,
		]);

		if (workoutsResults.rows.length === 0) {
			return res
				.status(204)
				.json({ message: "You don't have any workout added!", error: true });
		}

		return res.status(200).json({ data: workoutsResults.rows });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the routine's exercises",
			error: true,
		});
	}
};

const getWorkoutById = async (req, res) => {
	const user = req.session.user;
	const { workoutId } = req.params;
	const workoutIdNum = Number(workoutId);

	if (isNaN(workoutIdNum)) {
		return res
			.status(400)
			.json({ message: "The id isn't a number, try using one", error: true });
	}

	try {
		// Get the workout with the id gotten from the body
		const workoutResult = await pool.query(queries.getWorkoutById, [
			user.user_id,
			workoutIdNum,
		]);

		// Checking if the workout exists
		if (workoutResult.rows.length === 0) {
			return res.status(404).json({
				message: "Workout not found or doesn't belong to you",
				error: true,
			});
		}

		// If it exists, return it
		return res.status(200).json({ data: workoutResult.rows });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the routine's exercises",
			error: true,
		});
	}
};

const addWorkout = async (req, res) => {
	const user = req.session.user;
	const { routineId, notes } = req.body;

	try {
		//TODO: Add a check routine to see if it exists and its user is the user_id
		await pool.query(queries.addWorkout, [user.user_id, routineId, notes]);

		return res.status(201).json({
			message: "Workout added successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the routine's exercises",
			error: true,
		});
	}
};

module.exports = { userWorkouts, getWorkoutById, addWorkout };
