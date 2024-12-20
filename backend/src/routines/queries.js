const getRoutines = `SELECT * FROM routines`;
const getRoutinesByUser = `SELECT * FROM routines WHERE user_id = $1 ORDER BY day ASC`;
const getRoutinesByDay = `SELECT r.*, rd.day_name FROM routines r
													JOIN routines_days rd
														ON r.day = rd.id
													WHERE r.user_id = $1
													AND r.day = $2`;

const checkRoutinesName = `SELECT name FROM routines WHERE user_id = $1 AND name = $2`;
const checkRoutineConflicts = `SELECT * FROM routines 
															 WHERE user_id = $1 
															 AND (name = $2 OR day = $3);`;

const checkRoutineUser = `SELECT * FROM routines WHERE user_id = $1 AND routine_id = $2`;

const updateRoutineName = `UPDATE routines SET 
												   name = $1
													 WHERE routine_id = $2`;

const updateRoutineDay = `UPDATE routines SET 
													day = $1
													WHERE routine_id = $2`;

const createRoutine = `INSERT INTO routines (user_id, name, day) 
											 VALUES ($1, $2, $3)`;

const deleteRoutine = `DELETE FROM routines WHERE routine_id = $1`;

module.exports = {
	getRoutines,
	getRoutinesByUser,
	getRoutinesByDay,
	checkRoutinesName,
	checkRoutineConflicts,
	checkRoutineUser,
	updateRoutineName,
	updateRoutineDay,
	createRoutine,
	deleteRoutine,
};
