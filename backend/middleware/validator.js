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

module.exports = { validateUser };
