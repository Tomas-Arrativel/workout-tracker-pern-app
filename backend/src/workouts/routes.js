const { Router } = require("express");
const controller = require("./controller");

const { checkAuth } = require("../../middleware/authValidator");
const { validateWorkout } = require("../../middleware/validator");
const { handleValidationErrors } = require("../../middleware/validationErrors");

const router = Router();

router.get("/", checkAuth, controller.userWorkouts);
router.get("/:workoutId", checkAuth, controller.getWorkoutById);

router.post(
	"/",
	checkAuth,
	validateWorkout,
	handleValidationErrors,
	controller.addWorkout
);

module.exports = router;
