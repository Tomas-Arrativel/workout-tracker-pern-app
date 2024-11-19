const pool = require("../../db");
const queries = require("./queries");

const getExercisesByUser = async (req, res) => {
	const user = req.session.user;

	if (!user) {
		return res.status(401).json({
			message: "You need to log in to see your routine's exercises",
			error: true,
		});
	}

	const exercisesResults = await pool.query(queries.getExercisesByUser, [
		user.user_id,
	]);

	if (exercisesResults.rows.length === 0) {
		return res.status(204).json({
			message: "You don't have any routine with exercises, create one!",
			error: false,
		});
	}

	res.status(200).json({ exercises: exercisesResults.rows, error: false });
};

module.exports = { getExercisesByUser };
