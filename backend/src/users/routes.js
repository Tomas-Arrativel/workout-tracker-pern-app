const { Router } = require("express");
const controller = require("./controller");

const { validateUser } = require("../../middleware/validator");
const { validationResult } = require("express-validator");

const router = Router();

router.get("/", controller.getUsers);
router.get("/logout", controller.logout);
router.get("/profile", controller.getProfile);
router.get("/check-auth", controller.checkAuth);

// Create the user with validations
router.post("/", validateUser, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// If validation passes, proceed with user creation
	controller.createUser(req, res);
});

router.post("/login", controller.logUser);

router.put("/password", controller.changePassword);

module.exports = router;
