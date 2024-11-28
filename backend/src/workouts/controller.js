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
			message: "Error while getting the user's workouts",
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
			message: "Error while getting the workout",
			error: true,
		});
	}
};

const addWorkout = async (req, res) => {
	const user = req.session.user;
	const { routineId, notes } = req.body;

	try {
		// Check if the routine exists and its from the user
		const routinesResults = await pool.query(routinesQueries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);
		if (routinesResults.rows.length === 0) {
			return res.status(403).json({
				message: "This isn't your routine, use one created by you",
				error: true,
			});
		}

		// Return a message that the workout has been added
		await pool.query(queries.addWorkout, [user.user_id, routineId, notes]);

		return res.status(201).json({
			message: "Workout added successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while adding the workout",
			error: true,
		});
	}
};

const updateWorkout = async (req, res) => {
	const user = req.session.user;
	const { workoutId } = req.params;
	const { routineId, notes } = req.body;

	try {
		// Check if the workout is from the user
		const workoutResult = await pool.query(queries.getWorkoutById, [
			user.user_id,
			workoutId,
		]);
		if (workoutResult.rows.length === 0) {
			return res.status(403).json({
				message: "You can't update a workout from another user!",
				error: true,
			});
		}

		// Check if the routine exists and its from the user
		if (routineId) {
			const routinesResults = await pool.query(
				routinesQueries.checkRoutineUser,
				[user.user_id, routineId]
			);
			if (routinesResults.rows.length === 0) {
				return res.status(403).json({
					message: "This isn't your routine, use one created by you",
					error: true,
				});
			}
		}

		// If every is correct, update the routine and return a success message
		await pool.query(queries.updateWorkout, [
			routineId,
			notes,
			workoutId,
			user.user_id,
		]);
		return res.status(201).json({
			message: "Workout updated successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while updating the workout",
			error: true,
		});
	}
};

const deleteWorkout = async (req, res) => {
	const user = req.session.user;
	const { workoutId } = req.params;

	if (isNaN(workoutId)) {
		return res
			.status(400)
			.json({ message: "The id isn't a number, try using one", error: true });
	}

	try {
		// Check if the workout is from the user
		const workoutResult = await pool.query(queries.getWorkoutById, [
			user.user_id,
			workoutId,
		]);
		if (workoutResult.rows.length === 0) {
			return res.status(403).json({
				message: "You can't delete a workout from another user!",
				error: true,
			});
		}

		// Delete the workout if everything looks correct
		await pool.query(queries.deleteWorkout, [workoutId, user.user_id]);
		return res.status(201).json({
			message: "Workout deleted successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while deleting the workout",
			error: true,
		});
	}
};

module.exports = {
	userWorkouts,
	getWorkoutById,
	addWorkout,
	updateWorkout,
	deleteWorkout,
};
