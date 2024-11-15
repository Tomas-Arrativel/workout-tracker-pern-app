const { Router } = require("express");
const controller = require("./controller");

const {
	validateRoutine,
	validateRoutinesName,
	validateRoutinesDay,
} = require("../../middleware/validator");

const { validationResult } = require("express-validator");

const router = Router();

router.get("/", controller.getRoutines);
router.get("/my-routines", controller.getRoutinesByUser);

router.put("/name", validateRoutinesName, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// If validation passes, proceed with routine creation
	controller.changeRoutineName(req, res);
});

router.put("/day", validateRoutinesDay, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// If validation passes, proceed with routine creation
	controller.changeRoutineDay(req, res);
});

// Create routine with validations
router.post("/", validateRoutine, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// If validation passes, proceed with routine creation
	controller.createRoutine(req, res);
});

router.delete("/", controller.deleteRoutine);

module.exports = router;
