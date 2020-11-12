const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userModel');

router.post('/signup', async (req, res) => {
	try {
		const schema = Joi.object({
			username: Joi.string().alphanum().min(4).max(30).trim().required(),
			password: Joi.string().min(8).trim().required(),
		});

		// Validate
		const result = schema.validate(req.body);
		if (!result.error) {
			// Make sure username is unique
			const existingUser = await User.findOne({ username: req.body.username });
			if (existingUser) {
				res
					.status(409)
					.json({ message: 'Account with this username already exists.' });
			}

			// Hash the password
			const salt = await bcrypt.genSalt();
			const passwordHash = await bcrypt.hash(req.body.password, salt);

			const newUser = new User({
				username: req.body.username,
				password: passwordHash,
			});

			// Save user to the DB
			const savedUser = await newUser.save();
			res.status(201).json({
				username: savedUser.username,
				_id: savedUser._id,
				createdAt: savedUser.createdAt,
				updatedAt: savedUser.updatedAt,
			});
		}

		if (result.error.message) {
			res.status(409).json({ message: result.error.message });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
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
