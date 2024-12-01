const pool = require("../../db");
const queries = require("./queries");
const workoutQueries = require("../workouts/queries");

const getExercisesFromWorkout = async (req, res) => {
	const { workoutId } = req.params;

	if (isNaN(workoutId)) {
		return res.status(400).json({
			message: "The workout_id isn't a number, try using one",
			error: true,
		});
	}

	try {
		// Check if the user has any exercise in the workout
		const workoutExercisesResults = await pool.query(
			queries.getExercisesFromWorkout,
			[workoutId]
		);

		if (workoutExercisesResults.rows.length === 0) {
			return res.status(400).json({
				message: "The user didn't added any exercise to the workout",
				error: true,
			});
		}

		// If it has exercises, return them
		return res.status(200).json({
			data: workoutExercisesResults.rows,
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the workout's exercises",
			error: true,
		});
	}
};

const addExerciseToWorkout = async (req, res) => {
	const user = req.session.user;
	const { workoutId, exerciseId, weight, sets, reps, rir } = req.body;

	try {
		// Check if the workout is from the user
		const isFromUserResults = await pool.query(workoutQueries.getWorkoutById, [
			user.user_id,
			workoutId,
		]);
		if (isFromUserResults.rows.length === 0) {
			return res.status(403).json({
				message: "The workout isn't yours so you can't add an exercise to it",
				error: true,
			});
		}

		// Check if there's this exercise already loaded into the workout
		const isExerciseInUseResult = await pool.query(
			queries.getExerciseInWorkout,
			[workoutId, exerciseId]
		);
		if (isExerciseInUseResult.rows.length > 0) {
			return res.status(400).json({
				message: `This exercise ${exerciseId} is already registered in the workout, edit it instead!`,
				error: true,
			});
		}

		// If everything looks correct, insert the new exercise to the workout
		await pool.query(queries.addExercise, [
			workoutId,
			exerciseId,
			weight,
			sets,
			reps,
			rir,
		]);
		return res.status(201).json({
			message: "Exercise added successfully to the workout",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while adding the exercise to the workout",
			error: true,
		});
	}
};

const updateExerciseInWorkout = async (req, res) => {
	const user = req.session.user;
	const { workoutExerciseId, workoutId, exerciseId, weight, sets, reps, rir } =
		req.body;

	try {
		// Check if the workout is from the user
		const isFromUserResults = await pool.query(workoutQueries.getWorkoutById, [
			user.user_id,
			workoutId,
		]);
		if (isFromUserResults.rows.length === 0) {
			return res.status(403).json({
				message:
					"The workout isn't yours so you can't update any exercise in it",
				error: true,
			});
		}

		// If the exerciseId isn't null
		if (exerciseId) {
			// And isn't used in the workout, change it
			const isExerciseInUseResult = await pool.query(
				queries.getExerciseInWorkout,
				[workoutId, exerciseId]
			);
			if (isExerciseInUseResult.rows.length > 0) {
				return res.status(400).json({
					message: `This exercise ${exerciseId} is already registered in the workout, edit it instead!`,
					error: true,
				});
			}
		}

		// If everything is correct update the exercise
		await pool.query(queries.updateExercise, [
			exerciseId,
			weight,
			sets,
			reps,
			rir,
			workoutExerciseId,
		]);
		// Return a success message
		return res
			.status(204)
			.json({ message: "Exercise updated successfully", error: false });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while editing the exercise in the workout",
			error: true,
		});
	}
};

const deleteExerciseInWorkout = async (req, res) => {
	const user = req.session.user;
	const { workoutExerciseId, workoutId } = req.body;

	try {
		// Check if the workout is from the user
		const isFromUserResults = await pool.query(workoutQueries.getWorkoutById, [
			user.user_id,
			workoutId,
		]);
		if (isFromUserResults.rows.length === 0) {
			return res.status(403).json({
				message:
					"The workout isn't yours so you can't delete an exercise in it",
				error: true,
			});
		}

		// If there is no error delete the exercise
		await pool.query(queries.deleteExerciseInWorkout, [workoutExerciseId]);
		return res.status(204).json({
			message: "Workout exercise deleted successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while editing the exercise in the workout",
			error: true,
		});
	}
};

module.exports = {
	getExercisesFromWorkout,
	addExerciseToWorkout,
	updateExerciseInWorkout,
	deleteExerciseInWorkout,
};
