import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { logout } from "../../api/api";

import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
	const { isAuthenticated, setIsAuthenticated, setSessionData } =
		useContext(AuthContext);

	const handleLogout = async () => {
		await logout();
		setIsAuthenticated(false);
		setSessionData({});
		toast("Good byee!", {
			position: "top-center",
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};

	return (
		<div>
			<nav className="navbar">
				<div className="navbar__logo">
					<Link to={"/"}>
						<h2>WorkoutApp</h2>
					</Link>
				</div>
				<div className="navbar__links">
					<Link to={"/"}>Home</Link>
					{isAuthenticated ? (
						<>
							<Link to={"/dashboard"}>Dashboard</Link>
							<button onClick={handleLogout} className="logout-btn">
								Log out
							</button>
						</>
					) : (
						<>
							<Link to={"/login"}>Log in</Link>
							<Link to={"/register"} className="register-btn">
								Register
							</Link>
						</>
					)}
				</div>
			</nav>
			<Outlet />
		</div>
	);
};

export default Navbar;
