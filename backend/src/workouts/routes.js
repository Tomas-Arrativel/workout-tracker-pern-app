const { Router } = require("express");
const controller = require("./controller");

const { checkAuth } = require("../../middleware/authValidator");

const router = Router();

router.get("/", checkAuth, controller.userWorkouts);

module.exports = router;
