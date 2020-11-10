const router = require('express').Router();
const auth = require('../middleware/auth');
const Flip = require('../models/flipModel');

router.post('/', auth, async (req, res) => {
	try {
		const { itemName, buyPrice, quantity, isComplete } = req.body;
		let { sellPrice } = req.body;

		if (!itemName || !buyPrice || !quantity) {
			return res
				.status(400)
				.json({ msg: 'You need to fill all required fields.' });
		}

		if (isNaN(buyPrice)) {
			return res.status(400).json({ msg: 'Buy price must be a number.' });
		}

		if (isNaN(quantity)) {
			return res.status(400).json({ msg: 'Quantity must be a number.' });
		}

		if (!sellPrice) sellPrice = 0;

		if (isNaN(sellPrice)) {
			return res.status(400).json({ msg: 'Sell price must be a number.' });
		}

		const newFlip = new Flip({
			itemName,
			buyPrice,
			quantity,
			isComplete,
			userId: req.user,
			sellPrice,
		});

		const savedFlip = await newFlip.save();
		res.json(savedFlip);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get('/all', auth, async (req, res) => {
	const flips = await Flip.find({ userId: req.user });
	res.json(flips);
});

router.delete('/:id', auth, async (req, res) => {
	const flip = await Flip.find({ _id: req.params.id, userId: req.user });
	if (!flip) {
		return res.status(400).json({
			msg: 'No flip found with this ID that belongs to the current user.',
		});
	}

	const deletedFlip = await Flip.findByIdAndDelete(req.params.id);
	res.json(deletedFlip);
});

module.exports = router;
