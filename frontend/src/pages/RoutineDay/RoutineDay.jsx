import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRoutineExercisesByDay, getRoutinesByDay } from "../../api/api";
import { IoMdAddCircle } from "react-icons/io";
import Exercise from "../../components/Exercise/Exercise";

import "./RoutineDay.css";

const RoutineDay = () => {
	const { day } = useParams();
	const [routine, setRoutine] = useState({});
	const [routineExercises, setRoutineExercises] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const getRoutine = async () => {
			setIsLoading(true);
			try {
				const response = await getRoutinesByDay(day);
				const responseEx = await getRoutineExercisesByDay(day);
				setRoutine(response.data.routine);
				setRoutineExercises(responseEx.data.exercises);
			} catch (err) {
				setErrorMsg(err.response?.data?.message);
			} finally {
				setIsLoading(false);
			}
		};

		getRoutine();
	}, [day]);

	return (
		<div className="routines">
			<div className="routines-card">
				{isLoading ? (
					<div className="loader-small">
						Loading please wait...<i className="spinner"></i>
					</div>
				) : (
					<>
						<h2 className="routine__day">
							Day {day}
							{errorMsg ? "" : `: ${routine.name}`}
						</h2>
						<div className="exercises">
							{errorMsg ? (
								<p>{errorMsg}</p>
							) : (
								<>
									<div className="exercises__title">
										<h3>Exercises</h3>
										<Link
											className="exercises__title-add"
											to={`/routines/${day}/add`}
										>
											<IoMdAddCircle />
										</Link>
									</div>
									<div className="exercises__container">
										{routineExercises?.length > 0 ? (
											routineExercises.map((exercise) => (
												<Exercise
													key={exercise.exercise_id}
													name={exercise.exercise_name}
													muscleGroup={exercise.muscle_group}
													sets={exercise.sets}
													reps={exercise.reps}
												/>
											))
										) : (
											<p>No exercises available</p>
										)}
									</div>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default RoutineDay;
