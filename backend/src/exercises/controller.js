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

module.exports = {
	getExercises,
	getExerciseById,
};
