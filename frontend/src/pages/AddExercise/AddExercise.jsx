import React, { useEffect, useState } from "react";
import "./AddExercise.css";
import { getExercisesByMuscle, getMuscleGroups } from "../../api/api";

const AddExercise = () => {
	const [muscleGroups, setMuscleGroups] = useState([]);

	const [selectedMuscle, setSelectedMuscle] = useState("");
	const [selectedMuscleExercises, setSelectedMuscleExercises] = useState();

	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingExercises, setIsLoadingExercises] = useState(false);

	useEffect(() => {
		const fetchMuscleGroups = async () => {
			setIsLoading(true);
			try {
				// Get every muscle group
				const results = await getMuscleGroups();
				setMuscleGroups(results.data);
			} catch (err) {
				setError(err.response?.data || "Something went wrong");
			} finally {
				setIsLoading(false);
			}
		};

		fetchMuscleGroups();
	}, []);

	// Handle selection change
	const handleSelectChange = async (e) => {
		const selectedValue = e.target.value;
		setSelectedMuscle(selectedValue);
		setIsLoadingExercises(true);

		try {
			// Pass the current selection to the API
			const results = await getExercisesByMuscle(selectedValue);
			setSelectedMuscleExercises(results.data);
		} catch (err) {
			setError(err.response?.data || "Something went wrong");
		} finally {
			setIsLoadingExercises(false);
		}

		console.log(selectedMuscleExercises);
	};

	return (
		<div className="add-exercise-container">
			<div className="add-exercise">
				<h2 className="add-exercise__title">
					Search exercises by muscle groups
				</h2>

				{isLoading ? (
					<p>Loading muscle groups...</p>
				) : error ? (
					<p className="error">{error}</p>
				) : (
					<div className="add-exercise__form">
						<label htmlFor="muscle-group">Muscle Group:</label>
						<select
							id="muscle-group"
							value={selectedMuscle}
							onChange={handleSelectChange}
						>
							<option value="">-- Select a Muscle Group --</option>
							{muscleGroups?.map((group, i) => (
								<option
									className="option-muscle-group"
									key={`muscle-group-${i}`}
									value={group.muscle_group}
								>
									{group.muscle_group}
								</option>
							))}
						</select>

						{isLoadingExercises ? (
							<div className="loader-small">
								Loading please wait...<i className="spinner"></i>
							</div>
						) : selectedMuscle && selectedMuscleExercises?.length > 0 ? (
							<ul className="exercise-list">
								{selectedMuscleExercises.map((exercise) => (
									<li key={exercise.exercise_id} className="exercise-item">
										<div className="exercise-item-texts">
											<h4>{exercise.name}</h4>
											<p>{exercise.description}</p>
											<p>
												<span>Muscle Group:</span> {exercise.muscle_group}
											</p>
										</div>
										<button className="exercise-item-btn">+</button>
										{/* continue here tmrrow x*/}
									</li>
								))}
							</ul>
						) : (
							<p className="selected-info">You selected: {selectedMuscle}</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default AddExercise;
