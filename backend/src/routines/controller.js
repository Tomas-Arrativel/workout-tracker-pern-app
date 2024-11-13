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
		return res.status(200).json(routinesResults.rows);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Error while getting the routines", error: true });
	}
};

module.exports = {
	getRoutines,
};
