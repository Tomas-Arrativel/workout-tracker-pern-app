const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getExercises);
router.get("/:id", controller.getExerciseById);

module.exports = router;
