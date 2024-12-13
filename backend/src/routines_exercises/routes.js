const { Router } = require("express");
const controller = require("./controller");

// middlewares
const { validateRoutineExercise } = require("../../middleware/validator");
const { checkAuth } = require("../../middleware/authValidator");
const { handleValidationErrors } = require("../../middleware/validationErrors");

const router = Router();

// Get all exercises for a user
router.get("/", checkAuth, controller.getExercisesByUser);

// Get exercises for a day of the user
router.get("/:day", checkAuth, controller.getExercisesByDay);

// Get exercises for a specific routine
router.post("/by-routine", checkAuth, controller.getExercisesByRoutine);

// Add an exercise to a routine
router.post(
	"/add",
	checkAuth,
	validateRoutineExercise,
	handleValidationErrors,
	controller.addExerciseToRoutine
);

// Edit an exercise in a routine
router.put("/edit", checkAuth, controller.updateExerciseInRoutine);

// Delete an exercise from a routine
router.delete("/delete", checkAuth, controller.deleteExerciseInRoutine);

module.exports = router;
