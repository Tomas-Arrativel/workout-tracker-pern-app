const { Router } = require("express");
const controller = require("./controller");

const { checkAuth } = require("../../middleware/authValidator");

const router = Router();

module.exports = router;
