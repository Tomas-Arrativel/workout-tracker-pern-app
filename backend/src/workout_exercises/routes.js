const { Router } = require("express");
const controller = require("./controller");

const { checkAuth } = require("../../middleware/authValidator");
const { handleValidationErrors } = require("../../middleware/validationErrors");
const { validateAddExerciseToWorkout } = require("../../middleware/validator");

const router = Router();

router.get("/:workoutId", checkAuth, controller.getExercisesFromWorkout);

router.post(
	"/",
	checkAuth,
	validateAddExerciseToWorkout,
	handleValidationErrors,
	controller.addExerciseToWorkout
);

module.exports = router;
