const { Router } = require("express");
const controller = require("./controller");

const { validateRoutine } = require("../../middleware/validator");
const { validationResult } = require("express-validator");

const router = Router();

router.get("/", controller.getRoutines);
router.get("/my-routines", controller.getRoutinesByUser);

// Create routine with validations
router.post("/", validateRoutine, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// If validation passes, proceed with routine creation
	controller.createRoutine(req, res);
});

module.exports = router;
