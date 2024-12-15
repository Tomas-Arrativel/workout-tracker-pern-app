const getDays = `SELECT * FROM routines_days`;

const getDayById = `SELECT * FROM routines_days WHERE id = $1`;

module.exports = { getDays, getDayById };
