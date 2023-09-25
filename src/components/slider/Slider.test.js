import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStateWithCallbackLazy } from 'hooks/useStateWithCallback';
import Slider, { calcPercentage } from './Slider';

jest.mock('hooks/useStateWithCallback');

describe('Slider component', () => {
	const testId = 'component-slider';
	const onChangeMock = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('calcPercentage function calculates the percentage correctly when min < max', () => {
		expect(calcPercentage(50, 0, 100)).toBe(50);
		expect(calcPercentage(25, 0, 100)).toBe(25);
		expect(calcPercentage(75, 0, 100)).toBe(75);
	});

	it('calcPercentage function returns 0 when min is greater than or equal to max', () => {
		expect(calcPercentage(50, 100, 0)).toBe(0);
		expect(calcPercentage(25, 100, 100)).toBe(0);
		expect(calcPercentage(75, 100, 50)).toBe(0);
	});

	it('renders without error', () => {
		useStateWithCallbackLazy.mockReturnValue([50, onChangeMock]);

		render(<Slider data-testid={testId}/>);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
	});

	it('calls onChange when input value changes', () => {
		useStateWithCallbackLazy.mockReturnValue([50, onChangeMock]);
		render(<Slider data-testid={testId} value={50} min={10} max={100} onChange={onChangeMock}/>);
		const inputElement = screen.getByTestId(testId);

		fireEvent.change(inputElement, {target: {value: '75'}});

		expect(onChangeMock).toHaveBeenCalledWith(75, onChangeMock);
	});
});