const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getDays);
router.get("/:day", controller.getDayWithId);

module.exports = router;
