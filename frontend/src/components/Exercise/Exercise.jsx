import React from "react";

import "./Exercise.css";

const Exercise = ({ name, muscleGroup, sets, reps }) => {
	return (
		<div className="exercise-card">
			<div className="exercise-header">
				<h4>{name}</h4>
				<span className="exercise-muscle-group">{muscleGroup}</span>
			</div>
			<div className="exercise-details">
				<p>
					<strong>Sets:</strong> {sets}
				</p>
				<p>
					<strong>Reps:</strong> {reps}
				</p>
			</div>
		</div>
	);
};

export default Exercise;
