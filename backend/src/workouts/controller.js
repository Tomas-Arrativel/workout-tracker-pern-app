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

module.exports = { userWorkouts };
