const pool = require("../../db");
const queries = require("./queries");

const getDays = async (req, res) => {
	try {
		const results = await pool.query(queries.getDays);

		// Send every day
		res.status(200).json({ days: results.rows, error: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while fetching days",
			error: true,
		});
	}
};

const getDayWithId = async (req, res) => {
	// We get the day id in the params
	const { day } = req.params;

	try {
		const result = await pool.query(queries.getDayById, [day]);

		// Send the day with the required id
		res.status(200).json({ day: result.rows[0], error: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while fetching the day",
			error: true,
		});
	}
};

module.exports = { getDays, getDayWithId };
