import React, { useEffect, useState } from "react";
import RoutineCard from "../../components/RoutineCard/RoutineCard";
import { getRoutinesByUser } from "../../api/api";
import { Link } from "react-router-dom";

import "./Routines.css";

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

	// Map days of the week and find routines for each day
	const routinesByDay = daysOfWeek.map((day) => {
		const routine = routines.find((routine) => routine.day === day.id);
		return {
			dayName: day.name,
			routine: routine || null,
			dayId: day.id,
		};
	});

	return (
		<div className="routines">
			<div className="routines-card">
				<h2>Routines</h2>
				<div className="routines__container">
					{errorMsg ? <p>{errorMsg}</p> : ""}
					{isLoading ? (
						<div className="loader-small">
							Loading please wait...<i className="spinner"></i>
						</div>
					) : (
						routinesByDay.map(({ dayName, routine, dayId }) => (
							<Link
								to={`/routines/${dayId}`}
								key={dayId}
								className="routine-day"
							>
								<RoutineCard
									dayName={dayName}
									name={routine?.name || ""}
									day={dayId}
								/>
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Routines;
