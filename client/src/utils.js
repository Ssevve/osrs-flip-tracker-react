export const calcMargin = (flip) => {
	if (typeof flip !== 'undefined') {
		return flip.sellPrice ? flip.sellPrice - flip.buyPrice : 'N/A';
	}
};

export const calcROI = (flip) => {
	if (typeof flip !== 'undefined') {
		return flip.sellPrice
			? ((calcMargin(flip) / flip.buyPrice) * 100).toFixed(2)
			: 'N/A';
	}
};

export const calcProfit = (flip) => {
	if (typeof flip !== 'undefined') {
		return flip.sellPrice * flip.quantity - flip.buyPrice * flip.quantity;
	}
};

export const formatShortNumber = (number) => {
	if (isNaN(number)) return 'N/A';

	return new Intl.NumberFormat('en', {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: 2,
	}).format(number);
};

export const formatLongNumber = (number) => {
	if (isNaN(number)) return 'N/A';
	return new Intl.NumberFormat('en').format(number);
};
