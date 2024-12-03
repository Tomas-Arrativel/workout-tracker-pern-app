const express = require("express");
const cors = require("cors");

const usersRoutes = require("./src/users/routes");
const exercisesRoutes = require("./src/exercises/routes");
const routinesRoutes = require("./src/routines/routes");
const routinesExercisesRoutes = require("./src/routines_exercises/routes");
const workoutsRoutes = require("./src/workouts/routes");
const workoutsExercisesRoutes = require("./src/workout_exercises/routes");

const session = require("express-session");

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

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

app.use("/api/users", usersRoutes);
app.use("/api/exercises", exercisesRoutes);
app.use("/api/routines", routinesRoutes);
app.use("/api/r-exercises", routinesExercisesRoutes);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/w-exercises", workoutsExercisesRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
