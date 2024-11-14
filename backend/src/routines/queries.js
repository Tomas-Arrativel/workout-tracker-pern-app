const getRoutines = `SELECT * FROM routines`;
const getRoutinesByUser = `SELECT * FROM routines WHERE user_id = $1`;
const checkRoutinesName = `SELECT name FROM routines WHERE user_id = $1 AND name = $2`;
const checkRoutinesDay = `SELECT name FROM routines WHERE user_id = $1 AND day = $2`;

const createRoutine = `INSERT INTO routines (user_id, name, day) 
											 VALUES ($1, $2, $3)`;

module.exports = {
	getRoutines,
	getRoutinesByUser,
	checkRoutinesName,
	createRoutine,
	checkRoutinesDay,
};
