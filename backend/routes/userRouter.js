const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ msg: 'All fields are required.' });
		}

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ msg: 'There is no account with this email address.' });
		}

		// Check if password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid password.' });
		}

		// Generate JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.json({
			token,
			user: {
				id: user._id,
				displayName: user.displayName,
			},
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;
