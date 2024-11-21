const checkAuth = (req, res, next) => {
	if (!req.session.user) {
		return res.status(401).json({
			message: "You need to log in to perform this action",
			error: true,
		});
	}
	next();
};

module.exports = {
	checkAuth,
};
