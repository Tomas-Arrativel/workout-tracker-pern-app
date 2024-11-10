const getExercises = "SELECT * FROM exercises";
const getExerciseById = "SELECT * FROM exercises WHERE id = $1";

module.exports = {
	getExercises,
	getExerciseById,
};
