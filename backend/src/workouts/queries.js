const getWorkouts = `SELECT * FROM workouts WHERE user_id = $1`;
const getWorkoutById = `SELECT * FROM workouts WHERE user_id = $1 AND workout_id = $2`;

const addWorkout = `INSERT INTO workouts (user_id, routine_id, notes) VALUES ($1, $2, $3)`;

module.exports = { getWorkouts, getWorkoutById, addWorkout };
