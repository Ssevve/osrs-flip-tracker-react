const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		const authHeader = req.header('authorization');
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) {
			return res.status(401).json({ msg: 'No token provided.' });
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		if (!verified) {
			return res.status(403).json({ msg: 'Token not valid.' });
		}

		req.user = verified.id;
		next();
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports = auth;
