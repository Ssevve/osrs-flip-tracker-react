const mongoose = require('mongoose');

const flipSchema = new mongoose.Schema(
	{
		itemName: { type: String, required: true },
		buyPrice: { type: Number, required: true },
		quantity: { type: Number, required: true },
		isComplete: { type: Boolean, required: true },
		userId: { type: String, required: true },
		sellPrice: { type: Number },
	},
	{
		timestamps: true,
	}
);

module.exports = Flip = mongoose.model('flip', flipSchema);
