export const classList = (...classes) => {
	return classes.filter(c => (c != null && c.trim() !== '')).join(' ');
};