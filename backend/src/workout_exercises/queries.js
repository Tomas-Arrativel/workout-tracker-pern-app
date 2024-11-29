const getExercisesFromWorkout = `SELECT * FROM workout_exercises WHERE workout_id = $1`;
const getExerciseInWorkout = `SELECT * FROM workout_exercises 
                              WHERE workout_id = $1
                              AND exercise_id = $2`;

const addExercise = `INSERT INTO workout_exercises (workout_id, exercise_id, weight, sets, reps, rir)
                     VALUES ($1, $2, $3, $4, $5, $6)`;

module.exports = {
	getExercisesFromWorkout,
	getExerciseInWorkout,
	addExercise,
};
