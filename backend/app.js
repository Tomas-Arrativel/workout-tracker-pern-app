const express = require("express");
const usersRoutes = require("./src/users/routes");
const exercisesRoutes = require("./src/exercises/routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use("/api/users", usersRoutes);
app.use("/api/exercises", exercisesRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
