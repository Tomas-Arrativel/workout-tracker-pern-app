const getExercisesFromWorkout = `SELECT * FROM workout_exercises WHERE workout_id = $1`;
const getExerciseInWorkout = `SELECT * FROM workout_exercises 
                              WHERE workout_id = $1
                              AND exercise_id = $2`;

const addExercise = `INSERT INTO workout_exercises (workout_id, exercise_id, weight, sets, reps, rir)
                     VALUES ($1, $2, $3, $4, $5, $6)`;

const updateExercise = `UPDATE workout_exercises
                                  SET
                                    exercise_id = COALESCE($1, exercise_id),
                                    weight = COALESCE($2, weight),
                                    sets = COALESCE($3, sets),
                                    reps = COALESCE($4, reps),
                                    rir = COALESCE($5, rir)
                                  WHERE
                                    workout_exercise_id = $6`;

const deleteExerciseInWorkout = `DELETE FROM workout_exercises WHERE workout_exercise_id = $1`;

module.exports = {
	getExercisesFromWorkout,
	getExerciseInWorkout,
	addExercise,
	updateExercise,
	deleteExerciseInWorkout,
};
