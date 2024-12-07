import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import "./Login.css"; // Import the styles

const Login = () => {
	const navigate = useNavigate();
	const { setIsAuthenticated } = useContext(AuthContext);
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (formData) => {
		setLoading(true);

		try {
			const response = await login(formData);
			setIsAuthenticated(true);
			toast.success(`Welcome back ${response.data.user.username}!`, {
				position: "top-center",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			navigate("/dashboard");
		} catch (err) {
			setErrorMsg(
				err.response?.data?.message || "Invalid username or password"
			);
			toast.error(
				err.response?.data?.message || "Invalid username or password",
				{
					position: "top-center",
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "colored",
				}
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login__title">Login</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="login-form">
					<div className="form__group">
						<label htmlFor="username" className="form__group-label">
							Username:
						</label>
						<input
							type="text"
							id="username"
							className="form__group-input"
							placeholder="Enter your username"
							{...register("username", { required: "Username is required" })}
						/>
						{errors.username && (
							<p className="form__group-error">{errors.username.message}</p>
						)}
					</div>
					<div className="form__group">
						<label htmlFor="password" className="form__group-label">
							Password:
						</label>
						<input
							type="password"
							id="password"
							className="form__group-input"
							placeholder="Enter your password"
							{...register("password", { required: "Password is required" })}
						/>
						{errors.password && (
							<p className="form__group-error">{errors.password.message}</p>
						)}
					</div>
					{errorMsg !== "" ? (
						<p className="form__group-error">{errorMsg}</p>
					) : (
						""
					)}
					<button
						type="submit"
						className="form__group-button cta-button"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
					<div className="form__register-link">
						<p>
							Don't have an account? <Link to="/register">Register here</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
