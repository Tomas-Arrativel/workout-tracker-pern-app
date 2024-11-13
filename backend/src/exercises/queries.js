const getExercises = "SELECT * FROM exercises";
const getExerciseById = "SELECT * FROM exercises WHERE exercise_id = $1";
const getGroups = `SELECT muscle_group FROM exercises GROUP BY muscle_group`;
const getFiltered = `SELECT * FROM exercises WHERE muscle_group = $1`;

module.exports = {
	getExercises,
	getExerciseById,
	getGroups,
	getFiltered,
};
