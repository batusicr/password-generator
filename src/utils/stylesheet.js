export const classList = (...classes) => {
	return classes.filter(Boolean).join(' ');
}