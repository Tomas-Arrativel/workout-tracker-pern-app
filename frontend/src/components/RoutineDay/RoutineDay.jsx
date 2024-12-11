import React from "react";

import "./RoutineDay.css";

const RoutineDay = ({ dayName, name }) => {
	return (
		<div className="routine-day-card">
			<h3 className="day__name">{dayName}</h3>
			{name ? <p className="routine__name">{name}</p> : <p>No routine</p>}
		</div>
	);
};

export default RoutineDay;
