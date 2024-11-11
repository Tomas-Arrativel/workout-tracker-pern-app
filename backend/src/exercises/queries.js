const getExercises = "SELECT * FROM exercises";
const getExerciseById = "SELECT * FROM exercises WHERE exercise_id = $1";

module.exports = {
	getExercises,
	getExerciseById,
};
