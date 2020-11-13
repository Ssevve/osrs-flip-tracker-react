const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userModel');

const schema = Joi.object({
	username: Joi.string().alphanum().min(4).max(30).trim().required(),
	password: Joi.string().min(8).trim().required(),
});

const respondError409 = (res) => {
	res.status(409).json({ message: 'Unable to login.' });
};

// const generateAndSendToken = (user, res) => {
// 	const payload = {
// 		_id: user._id,
// 		username: user.username,
// 	}
// 	jwt.sign(payload, process.env.JWT_SECRET, {
// 		expiresIn: '1d',
// 	}, (err, token) => {
// 		if (err) res.status(400).json({ message: 'Failed to generate a token. Try again.' });
// 		res.json({
// 			token,
// 		});
// 	});
// }

router.post('/signup', async (req, res) => {
	try {
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
		const result = schema.validate(req.body);
		if (!result.error) {
			// Check if user exists
			const existingUser = await User.findOne({ username: req.body.username });
			if (existingUser) {
				// Compare the password
				bcrypt.compare(req.body.password, existingUser.password).then(match => {
					if (match) {
						// Passwords match
						// Generate and send the token
						const payload = {
							_id: existingUser._id,
							username: existingUser.username,
						}
						jwt.sign(payload, process.env.JWT_SECRET, {
							expiresIn: '1d',
						}, (err, token) => {
							if (err) respondError409(res);
							res.json({
								token,
							});
						});
					} else {
						respondError409(res);
					}
				});				
			} else {
				respondError409(res);
			}
		} else {
			respondError409(res);
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;
