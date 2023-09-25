export const isNumber = (value) => {
	const num = Number(value);
	return (!isNaN(num) && isFinite(num));
};

export const getValueInRange = (value, min, max) => {
	value = Number(value);

	if (!isNumber(value) || value < min) {
		return min;
	}

	if (value > max) {
		return max;
	}

	return value;
}