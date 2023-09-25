import { useState, useEffect, useRef, useCallback } from 'react';

export const useStateWithCallbackLazy = (initialState) => {
	const callbackRef = useRef(null);
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (callbackRef.current && callbackRef.current instanceof Function) {
			callbackRef.current(state);
			callbackRef.current = null;
		}
	}, [state]);

	const setStateWithCallback = useCallback((newState, callback) => {
		callbackRef.current = callback;

		return setState(newState);
	}, [callbackRef]);

	return [state, setStateWithCallback];
};