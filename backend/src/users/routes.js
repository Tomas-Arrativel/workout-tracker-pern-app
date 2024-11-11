const { Router } = require("express");
const controller = require("./controller");

const router = Router();

/* Typical Routes for Users Controller
GET /profile — Retrieves the logged-in user's profile information.
PUT /profile — Updates the logged-in user's profile information.
PUT /password — Changes the user's password.
POST /register — Registers a new user.
POST /login — Logs in the user and returns a JWT token.
DELETE /profile — Deletes the logged-in user's account. */

router.get("/", controller.getUsers);
router.get("/logout", controller.logout);
router.get("/profile", controller.getProfile);

router.post("/", controller.createUser);
router.post("/login", controller.logUser);

module.exports = router;
