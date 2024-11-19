const getExercisesByUser = `SELECT 
                                 re.routine_exercise_id, r.routine_id, e.exercise_id, 
                                 r.name AS routine_name, e.name AS exercise_name, 
                                 r.user_id, e.muscle_group
                               FROM routines_exercises re
                               JOIN routines r 
                                 ON re.routine_id = r.routine_id
                               JOIN exercises e
                                 ON re.exercise_id = e.exercise_id
                               WHERE user_id = 3`;

module.exports = { getExercisesByUser };
