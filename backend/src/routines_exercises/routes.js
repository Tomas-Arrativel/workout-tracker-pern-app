const { Router } = require("express");
const controller = require("./controller");

const { validationResult } = require("express-validator");

const { validateRoutineExercise } = require("../../middleware/validator");

const router = Router();

router.get("/", controller.getExercisesByUser);
router.post("/by-routine", controller.getExercisesByRoutine);

router.post("/add", validateRoutineExercise, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// If validation passes, proceed with routine creation
	controller.addExerciseToRoutine(req, res);
});

module.exports = router;
