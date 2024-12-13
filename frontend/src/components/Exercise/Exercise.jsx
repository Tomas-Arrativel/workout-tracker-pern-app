import React from "react";

import "./Exercise.css";

const Exercise = ({ name, muscleGroup, sets, reps }) => {
	return (
		<div>
			Exercise: {name}, for {muscleGroup}. {sets} x {reps}
		</div>
	);
};

export default Exercise;
