const { body } = require("express-validator");

const validateUser = [
	// Username must be alphanumeric and at least 3 characters long
	body("username")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long")
		.isAlphanumeric()
		.withMessage("Username should contain only letters and numbers"),

	// Email should be valid and not empty
	body("email")
		.isEmail()
		.withMessage("Please enter a valid email address")
		.normalizeEmail(),

	// Age should be an integer greater than or equal to 18
	body("age")
		.isInt({ min: 6 })
		.withMessage("Age must be a number and at least 6"),

	// Weight should be a valid number in metric units (kg)
	body("weight")
		.isFloat({ min: 0.1 })
		.withMessage("Weight must be a number and greater than 0"),

	// Height should be a valid number in metric units (meters)
	body("height")
		.isFloat({ min: 0.5 })
		.withMessage("Height must be a number and greater than 0.5 meters"),

	// Password must be at least 6 characters long
	body("password")
		.isLength({ min: 4 })
		.withMessage("Password must be at least 4 characters long"),
];

const validateRoutine = [
	// Routine must be at least 3 characters and alphanumeric
	body("name")
		.isLength({ min: 3 })
		.withMessage("Routine must be at least 3 characters long"),

	// day must be a number
	body("day").isNumeric().withMessage("The day can't be undefined"),
];

const validateRoutinesName = [
	// Routine must be at least 3 characters and alphanumeric
	body("name")
		.isLength({ min: 3 })
		.withMessage("Routine must be at least 3 characters long"),
];

const validateRoutinesDay = [
	// Routine must be at least 3 characters and alphanumeric
	body("day")
		.isInt({ min: 1, max: 7 })
		.withMessage("The day must be a number between 1 and 7"),
];

const validateRoutineExercise = [
	body("sets")
		.isInt({ min: 1, max: 12 })
		.withMessage("The sets must be a number between 1 and 12"),

	body("reps")
		.isInt({ min: 1, max: 40 })
		.withMessage("The reps must be a number between 1 and 40"),
];

module.exports = {
	validateUser,
	validateRoutine,
	validateRoutinesName,
	validateRoutinesDay,
	validateRoutineExercise,
};
