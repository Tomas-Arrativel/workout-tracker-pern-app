const getWorkouts = `SELECT * FROM workouts WHERE user_id = $1`;

module.exports = { getWorkouts };
