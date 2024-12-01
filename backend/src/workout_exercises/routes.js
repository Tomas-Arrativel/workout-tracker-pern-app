const { Router } = require("express");
const controller = require("./controller");

const { checkAuth } = require("../../middleware/authValidator");
const { handleValidationErrors } = require("../../middleware/validationErrors");
const {
	validateAddExerciseToWorkout,
	validateUpdateExerciseInWorkout,
} = require("../../middleware/validator");

const router = Router();

router.get("/:workoutId", checkAuth, controller.getExercisesFromWorkout);

router.post(
	"/",
	checkAuth,
	validateAddExerciseToWorkout,
	handleValidationErrors,
	controller.addExerciseToWorkout
);

router.put(
	"/",
	checkAuth,
	validateUpdateExerciseInWorkout,
	handleValidationErrors,
	controller.updateExerciseInWorkout
);

router.delete("/", checkAuth, controller.deleteExerciseInWorkout);

module.exports = router;
