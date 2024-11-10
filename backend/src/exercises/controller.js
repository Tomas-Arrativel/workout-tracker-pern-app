const pool = require("../../db");
const queries = require("./queries");

const getExercises = (req, res) => {
	pool.query(queries.getExercises, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const getExerciseById = (req, res) => {
	const exerciseId = parseInt(req.params.id);
	pool.query(queries.getExerciseById, [exerciseId], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

module.exports = {
	getExercises,
	getExerciseById,
};
