import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { logout } from "../../api/api";
import { FaBars, FaTimes } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
	const { isAuthenticated, setIsAuthenticated, setSessionData } =
		useContext(AuthContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const navbarRef = useRef(null); // Ref to detect outside clicks

	const handleLogout = async () => {
		await logout();
		setIsAuthenticated(false);
		setSessionData({});
		toast.info("Logout successfully!", {
			position: "top-center",
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Close menu if clicked outside
	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (navbarRef.current && !navbarRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const getLinkClassName = (path) => {
		return location.pathname === path ? "active" : "";
	};

	return (
		<div>
			<nav className="navbar" ref={navbarRef}>
				<div className="navbar__logo">
					<Link to={"/"}>
						<h2>WorkoutApp</h2>
					</Link>
				</div>
				<div
					className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}
				>
					<Link
						to={"/"}
						className={getLinkClassName("/")}
						onClick={() => setIsMenuOpen(false)}
					>
						Home
					</Link>
					{isAuthenticated ? (
						<>
							<Link
								to={"/dashboard"}
								className={getLinkClassName("/dashboard")}
								onClick={() => setIsMenuOpen(false)}
							>
								Dashboard
							</Link>
							<Link
								to={"/routines"}
								className={getLinkClassName("/routines")}
								onClick={() => setIsMenuOpen(false)}
							>
								Routines
							</Link>
							<Link
								to={"/workouts"}
								className={getLinkClassName("/workouts")}
								onClick={() => setIsMenuOpen(false)}
							>
								Workouts
							</Link>
							<button
								onClick={() => {
									handleLogout();
									setIsMenuOpen(false);
								}}
								className="logout-btn"
							>
								Log out
							</button>
						</>
					) : (
						<>
							<Link
								to={"/login"}
								className={getLinkClassName("/login")}
								onClick={() => setIsMenuOpen(false)}
							>
								Log in
							</Link>
							<Link
								to={"/register"}
								className={`register-btn ${getLinkClassName("/register")}`}
								onClick={() => setIsMenuOpen(false)}
							>
								Register
							</Link>
						</>
					)}
				</div>
				<div className="navbar__toggle" onClick={toggleMenu}>
					{isMenuOpen ? (
						<FaTimes size={24} color="white" />
					) : (
						<FaBars size={24} color="white" />
					)}
				</div>
			</nav>
			<Outlet />
		</div>
	);
};

export default Navbar;
