const getWorkouts = `SELECT * FROM workouts WHERE user_id = $1`;
const getWorkoutById = `SELECT * FROM workouts WHERE user_id = $1 AND workout_id = $2`;

module.exports = { getWorkouts, getWorkoutById };
