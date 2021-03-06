const jwt = require('jsonwebtoken');

const checkTokenSetUser = (req, res, next) => {
		const authHeader = req.get('authorization');
		if (authHeader) {
			const token = authHeader.split(' ')[1];
			if (token) {
				jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
					if (error) console.log(error);

					req.user = user;
					next();
				});
			} else {
				next();
			}
		} else {
			next();
		}
};

module.exports = {
	checkTokenSetUser,
};
