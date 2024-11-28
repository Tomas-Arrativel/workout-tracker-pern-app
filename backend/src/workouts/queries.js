const getWorkouts = `SELECT * FROM workouts WHERE user_id = $1`;
const getWorkoutById = `SELECT * FROM workouts WHERE user_id = $1 AND workout_id = $2`;

const addWorkout = `INSERT INTO workouts (user_id, routine_id, notes) VALUES ($1, $2, $3)`;
const updateWorkout = `UPDATE workouts
                       SET
                         routine_id = COALESCE($1, routine_id),
                         notes = COALESCE($2, notes)
                       WHERE
                         workout_id = $3 AND user_id = $4`;

const deleteWorkout = `DELETE FROM workouts WHERE workout_id = $1 AND user_id = $2`;

module.exports = {
	getWorkouts,
	getWorkoutById,
	addWorkout,
	updateWorkout,
	deleteWorkout,
};
