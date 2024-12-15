const express = require("express");
const cors = require("cors");

const usersRoutes = require("./src/users/routes");
const exercisesRoutes = require("./src/exercises/routes");
const routinesRoutes = require("./src/routines/routes");
const routinesExercisesRoutes = require("./src/routines_exercises/routes");
const workoutsRoutes = require("./src/workouts/routes");
const workoutsExercisesRoutes = require("./src/workout_exercises/routes");
const daysRoutes = require("./src/days/routes");

const session = require("express-session");

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

const PORT = 3000;

app.use(express.json());
app.use(
	session({
		secret: "process.env.SESSION_KEY",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false, // Set to true if using HTTPS
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);

app.use("/api/users", usersRoutes);
app.use("/api/exercises", exercisesRoutes);
app.use("/api/routines", routinesRoutes);
app.use("/api/r-exercises", routinesExercisesRoutes);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/w-exercises", workoutsExercisesRoutes);
app.use("/api/days", daysRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
