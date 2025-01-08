import React, { useEffect, useState } from "react";
import "./AddExerciseForm.css";

import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getExercisesNames } from "../../api/api";

const AddExerciseForm = () => {
	const { day, exercise } = useParams();

	const [isLoading, setIsLoading] = useState(false);
	const [exerciseData, setExerciseData] = useState({});
	const [error, setError] = useState();

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
				setError(err.response?.data || "Something went wrong");
			} finally {
				setIsLoading(false);
			}
		};

		getExercise();
	}, []);

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
							Add {exerciseData.name} to routine
						</h2>

						{/*Create the form for the sets and reps */}
					</>
				)}
			</div>
		</div>
	);
};

export default AddExerciseForm;
