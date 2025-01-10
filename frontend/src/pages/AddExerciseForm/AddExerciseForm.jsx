import React, { useEffect, useState } from "react";
import "./AddExerciseForm.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
	addExerciseToRoutine,
	getExercisesNames,
	getRoutinesByDay,
} from "../../api/api";

const AddExerciseForm = () => {
	const { day, exercise } = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [exerciseData, setExerciseData] = useState({});
	const [error, setError] = useState();
	const [sets, setSets] = useState(3);
	const [reps, setReps] = useState(8);

	useEffect(() => {
		// Get exercise data
		const getExercise = async () => {
			setIsLoading(true);
			try {
				// Search the exercise id in the api
				const results = await getExercisesNames(exercise);
				setExerciseData(results.data);
			} catch (err) {
				// Set the error
				setError(err.response?.data.message || "Something went wrong");
			} finally {
				setIsLoading(false);
			}
		};

		getExercise();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		try {
			const resultRoutine = await getRoutinesByDay(day);

			if (resultRoutine != null && resultRoutine?.data.error === false) {
				await addExerciseToRoutine(
					resultRoutine?.data.routine.routine_id,
					exercise,
					sets,
					reps
				);

				navigate(`/routines/${day}`);
			}
		} catch (err) {
			// Set the error
			setError(err.response?.data.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="exerciseForm__container">
			<div className="exerciseForm">
				{isLoading ? (
					<div className="loader-small">
						Loading please wait...<i className="spinner"></i>
					</div>
				) : (
					<>
						<Link to={`/routines/${day}/add`} className="back-to-exercises">
							<IoMdArrowRoundBack className="back-icon-exercises" />
							<span>Back to Exercises</span>
						</Link>

						<h2 className="exerciseForm__title">
							Add <span>{exerciseData.name}</span> to routine
						</h2>

						<form onSubmit={handleSubmit} className="sets-reps-form">
							<div className="sets-reps-container">
								{/* Sets Selector */}
								<div className="sets-selector">
									<h3>Sets</h3>
									<div className="sets-btn-group">
										{[1, 2, 3, 4, 5, 6, 8].map((value) => (
											<button
												type="button"
												key={value}
												className={sets === value ? "selected" : ""}
												onClick={() => setSets(value)}
											>
												{value}
											</button>
										))}
									</div>
								</div>

								{/* Reps Selector */}
								<div className="reps-selector">
									<h3>Reps</h3>
									<div className="reps-btn-group">
										{[3, 5, 8, 10, 12, 15, 30].map((value) => (
											<button
												type="button"
												key={value}
												className={reps === value ? "selected" : ""}
												onClick={() => setReps(value)}
											>
												{value}
											</button>
										))}
									</div>
								</div>
							</div>

							{error != undefined ? <p className="errorMsg">{error}</p> : ""}

							<button
								type="submit"
								className="add-exercise-btn"
								disabled={isLoading || error != undefined}
							>
								Add Exercise
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default AddExerciseForm;
