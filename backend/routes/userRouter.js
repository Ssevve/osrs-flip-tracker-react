const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
	try {
		const { email, password, passwordCheck, displayName } = req.body;

		// Validate
		if (!email || !password || !passwordCheck || !displayName) {
			return res.status(400).json({ msg: 'All fields are required.' });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ msg: 'Password must be at least 8 characters long.' });
		}

		if (password !== passwordCheck) {
			return res.status(400).json({ msg: "Passwords don't match." });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res
				.status(400)
				.json({ msg: 'Account with this email already exists.' });
		}

		const existingDisplayName = await User.findOne({ displayName });
		if (existingDisplayName) {
			return res.status(400).json({ msg: 'Display name already taken.' });
		}

		// Hash the password
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			password: passwordHash,
			displayName,
		});

		// Save user to the DB
		const savedUser = await newUser.save();
		res.json({
			email,
			displayName,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;
