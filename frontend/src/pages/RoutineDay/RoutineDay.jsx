import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	getDayById,
	getRoutineExercisesByDay,
	getRoutinesByDay,
} from "../../api/api";

import { IoMdAddCircle, IoMdArrowRoundBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import Exercise from "../../components/Exercise/Exercise";

import "./RoutineDay.css";

const RoutineDay = () => {
	const { day } = useParams();

	const [routine, setRoutine] = useState({});
	const [routineExercises, setRoutineExercises] = useState([]);
	const [dayName, setDayName] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		// Create the function to get the routine info
		const getRoutine = async () => {
			setIsLoading(true);

			try {
				// Set the routine response
				const response = await getRoutinesByDay(day);
				setRoutine(response.data.routine);

				// We get the exercises in the routine
				const responseEx = await getRoutineExercisesByDay(day);
				setRoutineExercises(responseEx.data.exercises);
			} catch (err) {
				setError(err.response?.data);
			} finally {
				setIsLoading(false);
			}
		};

		// Create the function to get the day
		const getDay = async () => {
			setIsLoading(true);

			try {
				// We get the dayname of the routine
				const responseDay = await getDayById(day);
				setDayName(responseDay.data.day.day_name);
			} catch (err) {
				setError(err.response?.data);
			} finally {
				setIsLoading(false);
			}
		};

		getRoutine();
		getDay();
	}, [day]);

	return (
		<div className="routines">
			<div className="routines-card">
				<div className="routine-card-btns">
					<Link to={"/routines"} className="back-to-routines">
						<IoMdArrowRoundBack className="back-icon" />
						<span>Back to Routines</span>
					</Link>
					{/* Add a 3 dots icon to edit or delete an exercise */}
					<button className="options-btn">
						<SlOptionsVertical />
					</button>
				</div>

				{isLoading ? (
					<div className="loader-small">
						Loading please wait...<i className="spinner"></i>
					</div>
				) : (
					<>
						<h2 className="routine__day">
							{dayName}
							{error ? "" : `: ${routine.name}`}
						</h2>
						<div className="exercises">
							{error && error?.from === "routines" ? (
								<p>
									{error.message}.{" "}
									<Link to={`/routines/${day}/create`}>Add one here</Link>
								</p>
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
										{error ? (
											<p>{error.message}</p>
										) : (
											<>
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
											</>
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
