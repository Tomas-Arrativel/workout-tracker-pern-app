const getExercisesByUser = `SELECT 
                                 re.routine_exercise_id, r.routine_id, e.exercise_id, 
                                 r.name AS routine_name, e.name AS exercise_name, 
                                 r.user_id, e.muscle_group, re.sets, re.reps
                               FROM routines_exercises re
                               JOIN routines r 
                                 ON re.routine_id = r.routine_id
                               JOIN exercises e
                                 ON re.exercise_id = e.exercise_id
                               WHERE r.user_id = $1`;

const getExercisesByRoutine = `SELECT 
                                 re.routine_exercise_id, r.name AS routine_name,
                                 e.name AS exercise_name, e.muscle_group, re.sets, re.reps
                               FROM routines_exercises re
                               JOIN routines r 
                                 ON re.routine_id = r.routine_id
                               JOIN exercises e
                                 ON re.exercise_id = e.exercise_id
                               WHERE r.user_id = $1
                               AND re.routine_id = $2`;

const checkRoutineExercise = `SELECT routine_exercise_id FROM routines_exercises
                              WHERE routine_id = $1 AND exercise_id = $2`;

const addExerciseToRoutine = `INSERT INTO routines_exercises (routine_id, exercise_id, sets, reps)
                              VALUES ($1, $2, $3, $4)`;

module.exports = {
	getExercisesByUser,
	getExercisesByRoutine,
	checkRoutineExercise,
	addExerciseToRoutine,
};
