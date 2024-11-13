const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getExercises);
router.get("/:id", controller.getExerciseById);
router.get("/muscles/groups", controller.getMuscleGroups);

router.post("/muscles/filtered", controller.getExercisesFiltered);

module.exports = router;
