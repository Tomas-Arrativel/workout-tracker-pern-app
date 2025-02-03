import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
	getDayById,
	getRoutineExercisesByDay,
	getRoutinesByDay,
} from "../../api/api";

import { IoMdAddCircle, IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
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
	const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dropdownRef = useRef(null); // Ref to track the dropdown element

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

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	// Close dropdown if clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Check if the click is outside the dropdown
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		// Add event listener for clicks on the document
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleModal = () => setIsModalOpen((prev) => !prev);

	return (
		<div className="routines">
			<div className="routines-card">
				<div className="routine-card-btns">
					<Link to={"/routines"} className="back-to-routines">
						<IoMdArrowRoundBack className="back-icon" />
						<span>Back to Routines</span>
					</Link>
					{/* Add a 3 dots icon to edit or delete an exercise */}
					<div className="dropdown-container" ref={dropdownRef}>
						<button className="options-btn" onClick={toggleDropdown}>
							<SlOptionsVertical />
						</button>
						{isDropdownOpen && (
							<div className="dropdown-menu">
								{/* New page where i can edit title, day and exercises */}
								<button className="dropdown-item" onClick={toggleModal}>
									Edit
								</button>
								<button className="dropdown-item delete">Delete</button>
							</div>
						)}
					</div>
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

			{isModalOpen && (
				<div className="modal">
					<div className="modal-content">
						<div className="modal-header">
							<h2>Edit Routine</h2>
							<IoMdClose className="close-btn" onClick={toggleModal} />
						</div>
						<div className="modal-body">
							<label htmlFor="name">Routine's name</label>
							<input type="text" id="name" />
							<label htmlFor="day">Day</label>
							<select id="day">
								{/* {daysOfWeek.map((day) => (
								<option key={day} value={day}>
									{day}
								</option>
							))} */}
							</select>
						</div>
						<div className="modal-footer">
							<button className="cancel-btn" onClick={toggleModal}>
								Close
							</button>
							<button className="save-btn">Edit</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoutineDay;
