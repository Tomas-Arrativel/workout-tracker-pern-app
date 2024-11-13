const pool = require("../../db");
const queries = require("./queries");

const getExercises = async (req, res) => {
	try {
		const result = await pool.query(queries.getExercises);

		// Send every exercise
		res.status(200).json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while fetching exercises",
			error: true,
		});
	}
};

const getExerciseById = async (req, res) => {
	const exerciseId = parseInt(req.params.id);
	try {
		const result = await pool.query(queries.getExerciseById, [exerciseId]);

		// If no results are found, return error
		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ message: "Exercise not found", error: true });
		}
		// Return the exercise
		return res.status(200).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "An error occurred while fetching the exercise",
			error: true,
		});
	}
};

const getMuscleGroups = async (req, res) => {
	try {
		const groupsResults = await pool.query(queries.getGroups);

		// If no results, return an error
		if (groupsResults.rows.length === 0) {
			return res
				.status(404)
				.json({ message: "Can't get the muscular groups", error: true });
		}

		// Else return the list of groups
		return res.status(200).json(groupsResults.rows);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "An error occurred while fetching the exercise",
			error: true,
		});
	}
};

const getExercisesFiltered = async (req, res) => {
	const { muscleGroup } = req.body;

	// Check if muscleGroup is provided
	if (!muscleGroup) {
		return res.status(400).json({
			message: "Muscle group is required",
			error: true,
		});
	}

	try {
		// Get exercises with the muscle group given
		const filteredResults = await pool.query(queries.getFiltered, [
			muscleGroup,
		]);

		// If there is no exercise with the muscle group, return error
		if (filteredResults.rows.length === 0) {
			return res.status(404).json({
				message: "No exercise found with the muscle group provided",
				error: true,
			});
		}

		// If there are any results, return them
		return res.status(200).json(filteredResults.rows);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "An error occurred while fetching the exercise",
			error: true,
		});
	}
};

module.exports = {
	getExercises,
	getExerciseById,
	getMuscleGroups,
	getExercisesFiltered,
};
