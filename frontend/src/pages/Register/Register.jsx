import React, { useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { register as registerApi } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = async (formData) => {
		setLoading(true);
		try {
			await registerApi(formData);

			toast.success("Registration completed!", {
				position: "top-center",
				autoClose: 2500,
				theme: "colored",
			});

			navigate("/login");
		} catch (err) {
			setErrorMsg(
				err.response?.data?.message || err.response?.data?.errors[0]?.msg
			);

			toast.error(
				err.response?.data?.message || err.response?.data?.errors[0]?.msg,
				{
					position: "top-center",
					autoClose: 2500,
					theme: "colored",
				}
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register-container">
			<div className="register-card">
				<h2 className="register__title">Register</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="register-form">
					{/* Username */}
					<div className="register__group">
						<label htmlFor="username" className="register__group-label">
							Username:
						</label>
						<input
							type="text"
							id="username"
							className="register__group-input"
							placeholder="Enter your username"
							{...register("username", {
								required: "Username is required",
								minLength: { value: 3, message: "At least 3 characters" },
							})}
						/>
						{errors.username && (
							<p className="register__group-error">{errors.username.message}</p>
						)}
					</div>

					{/* Email */}
					<div className="register__group">
						<label htmlFor="email" className="register__group-label">
							Email:
						</label>
						<input
							type="email"
							id="email"
							className="register__group-input"
							placeholder="Enter your email"
							{...register("email", { required: "Email is required" })}
						/>
						{errors.email && (
							<p className="register__group-error">{errors.email.message}</p>
						)}
					</div>

					{/* Password */}
					<div className="register__group">
						<label htmlFor="password" className="register__group-label">
							Password:
						</label>
						<input
							type="password"
							id="password"
							className="register__group-input"
							placeholder="Enter your password"
							{...register("password", {
								required: "Password is required",
								minLength: { value: 4, message: "At least 4 characters" },
							})}
						/>
						{errors.password && (
							<p className="register__group-error">{errors.password.message}</p>
						)}
					</div>

					{/* Age */}
					<div className="register__group">
						<label htmlFor="age" className="register__group-label">
							Age:
						</label>
						<input
							type="number"
							id="age"
							className="register__group-input"
							placeholder="Enter your age"
							{...register("age", {
								required: "Age is required",
								min: { value: 6, message: "Must be at least 6 years old" },
							})}
						/>
						{errors.age && (
							<p className="register__group-error">{errors.age.message}</p>
						)}
					</div>

					{/* Weight Slider */}
					<div className="register__group">
						<label htmlFor="weight" className="register__group-label">
							Weight: {watch("weight") || 60} kg
						</label>
						<input
							type="range"
							id="weight"
							className="register__group-slider"
							min="30"
							max="200"
							step="1"
							{...register("weight", { required: "Weight is required" })}
						/>
						{errors.weight && (
							<p className="register__group-error">{errors.weight.message}</p>
						)}
					</div>

					{/* Height Slider */}
					<div className="register__group">
						<label htmlFor="height" className="register__group-label">
							Height: {watch("height") || 170} cm
						</label>
						<input
							type="range"
							id="height"
							className="register__group-slider"
							min="50"
							max="250"
							step="1"
							{...register("height", { required: "Height is required" })}
						/>
						{errors.height && (
							<p className="register__group-error">{errors.height.message}</p>
						)}
					</div>

					{
						/* Error message */
						errorMsg !== "" ? (
							<p className="register__group-error">{errorMsg}</p>
						) : (
							""
						)
					}

					{/* Submit Button */}
					<button
						type="submit"
						className="register__group-button cta-button"
						disabled={loading}
					>
						{loading ? "Registering..." : "Register"}
					</button>

					{/* Login Link */}
					<div className="register__register-link">
						<p>
							Already have an account? <Link to="/login">Login here</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
