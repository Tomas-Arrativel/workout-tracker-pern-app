const pool = require("../../db");
const queries = require("./queries");
const routinesQueries = require("../routines/queries");

const getExercisesByUser = async (req, res) => {
	const user = req.session.user;

	try {
		// Check if he has any exercise stored in the routines
		const exercisesResults = await pool.query(queries.getExercisesByUser, [
			user.user_id,
		]);

		// If no exercise is found, throw an error message
		if (exercisesResults.rows.length === 0) {
			return res.status(204).json({
				message: "You don't have any routine with exercises, create one!",
				error: false,
			});
		}

		// Else return the exercises
		res.status(200).json({ exercises: exercisesResults.rows, error: false });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the routines exercises",
			error: true,
		});
	}
};

const getExercisesByRoutine = async (req, res) => {
	const user = req.session.user;
	const { routineId } = req.body;

	try {
		// Check if he has any exercise stored in the routine with that id
		const exercisesResults = await pool.query(queries.getExercisesByRoutine, [
			user.user_id,
			routineId,
		]);

		// If no exercise is found, throw an error message
		if (exercisesResults.rows.length === 0) {
			return res.status(204).json({
				message: "You don't have any exercise in that routine, add one!",
				error: false,
			});
		}

		res.status(200).json({ exercises: exercisesResults.rows, error: false });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while getting the routine's exercises",
			error: true,
		});
	}
};

const addExerciseToRoutine = async (req, res) => {
	const user = req.session.user;
	const { routineId, exerciseId, sets, reps } = req.body;

	try {
		// Check if the routine belongs to the user
		const routineCheck = await pool.query(routinesQueries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);

		if (routineCheck.rows.length === 0) {
			return res.status(403).json({
				message: "This isn't your routine!",
				error: true,
			});
		}

		// Check if the exercise is already in the routine
		const routineExerciseCheck = await pool.query(
			queries.checkRoutineExercise,
			[routineId, exerciseId]
		);

		if (routineExerciseCheck.rows.length > 0) {
			return res.status(409).json({
				message:
					"This exercise is already loaded in the routine, edit it instead!",
				error: true,
			});
		}

		// Add the exercise to the routine
		await pool.query(queries.addExerciseToRoutine, [
			routineId,
			exerciseId,
			sets,
			reps,
		]);

		res.status(201).json({
			message: "Exercise added to routine successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error while adding exercise to routine",
			error: true,
		});
	}
};

const updateExerciseInRoutine = async (req, res) => {
	const user = req.session.user;
	const { rExerciseId, routineId, newExerciseId, sets, reps } = req.body;

	try {
		// Check if the routine belongs to the user
		const checkRoutine = await pool.query(routinesQueries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);

		if (checkRoutine.rows.length === 0) {
			return res.status(403).json({
				message: "This isn't your routine!",
				error: true,
			});
		}

		// Update the exercise in the routine if it exists
		const updateExercise = await pool.query(queries.updateExerciseInRoutine, [
			newExerciseId || null,
			sets || null,
			reps || null,
			routineId,
			rExerciseId,
		]);

		if (updateExercise.rows.length === 0) {
			return res.status(404).json({
				message: "Exercise not found in the specified routine",
				error: true,
			});
		}

		res.status(200).json({
			message: "Exercise updated successfully",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while editting an exercise of your routine",
			error: true,
		});
	}
};

const deleteExerciseInRoutine = async (req, res) => {
	const user = req.session.user;
	const { rExerciseId, routineId } = req.body;

	try {
		// Check if the routine belongs to the user
		const checkRoutine = await pool.query(routinesQueries.checkRoutineUser, [
			user.user_id,
			routineId,
		]);

		if (checkRoutine.rows.length === 0) {
			return res.status(403).json({
				message: "This isn't your routine!",
				error: true,
			});
		}

		// Delete if the exercise is in the routine
		const deleteResults = await pool.query(queries.deleteExerciseInRoutine, [
			routineId,
			rExerciseId,
		]);

		if (deleteResults.rows.length === 0) {
			return res.status(404).json({
				message: "Exercise not found in the specified routine",
				error: true,
			});
		}

		return res.status(200).json({
			message: "Exercise deleted successfully from the routine",
			error: false,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Error while adding exercise to routine",
			error: true,
		});
	}
};

module.exports = {
	getExercisesByUser,
	getExercisesByRoutine,
	addExerciseToRoutine,
	updateExerciseInRoutine,
	deleteExerciseInRoutine,
};
