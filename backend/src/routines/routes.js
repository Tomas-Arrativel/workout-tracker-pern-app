const { Router } = require("express");
const controller = require("./controller");

const {
	validateRoutine,
	validateRoutinesName,
	validateRoutinesDay,
} = require("../../middleware/validator");

const { validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../middleware/validationErrors");
const { checkAuth } = require("../../middleware/authValidator");

const router = Router();

router.get("/", controller.getRoutines);
router.get("/my-routines", checkAuth, controller.getRoutinesByUser);

router.put(
	"/name",
	checkAuth,
	validateRoutinesName,
	handleValidationErrors,
	controller.changeRoutineName
);

router.put(
	"/day",
	checkAuth,
	validateRoutinesDay,
	handleValidationErrors,
	controller.changeRoutineDay
);

// Create routine with validations
router.post(
	"/",
	checkAuth,
	validateRoutine,
	handleValidationErrors,
	controller.createRoutine
);

router.delete("/", checkAuth, controller.deleteRoutine);

module.exports = router;
