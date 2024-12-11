import React, { useEffect, useState } from "react";

import "./Routines.css";
import { getRoutinesByUser } from "../../api/api";
import RoutineDay from "../../components/RoutineDay/RoutineDay";

const Routines = () => {
	const [errorMsg, setErrorMsg] = useState("");
	const [routines, setRoutines] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Array of week days
	const daysOfWeek = [
		{ id: 1, name: "Monday" },
		{ id: 2, name: "Tuesday" },
		{ id: 3, name: "Wednesday" },
		{ id: 4, name: "Thursday" },
		{ id: 5, name: "Friday" },
		{ id: 6, name: "Saturday" },
		{ id: 7, name: "Sunday" },
	];

	useEffect(() => {
		const getRoutines = async () => {
			setIsLoading(true);
			try {
				const response = await getRoutinesByUser();
				setRoutines(response.data.routines);
			} catch (err) {
				setErrorMsg(err.response?.data?.message);
			} finally {
				setIsLoading(false);
			}
		};

		getRoutines();
	}, []);

	console.log(routines || errorMsg);

	// Map days of the week and find routines for each day
	const routinesByDay = daysOfWeek.map((day) => {
		const routine = routines.find((routine) => routine.day === day.id);
		return {
			dayName: day.name,
			routine: routine || null,
		};
	});

	return (
		<div className="routines">
			<div className="routines-card">
				<h2>Routines</h2>
				<div className="routines__container">
					{isLoading ? (
						<div className="loader-small">
							Loading please wait...<i className="spinner"></i>
						</div>
					) : (
						routinesByDay.map(({ dayName, routine }) => (
							<div key={dayName} className="routine-day">
								<RoutineDay dayName={dayName} name={routine?.name || ""} />
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Routines;
