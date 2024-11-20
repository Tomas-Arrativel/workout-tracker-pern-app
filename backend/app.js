const express = require("express");
const usersRoutes = require("./src/users/routes");
const exercisesRoutes = require("./src/exercises/routes");
const routinesRoutes = require("./src/routines/routes");
const routinesExercisesRoutes = require("./src/routines_exercises/routes");

const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(
	session({
		secret: "your-secret-key", // replace with a secure key in production
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 120 }, // 2 hour
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use("/api/users", usersRoutes);
app.use("/api/exercises", exercisesRoutes);
app.use("/api/routines", routinesRoutes);
app.use("/api/r-exercises", routinesExercisesRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
