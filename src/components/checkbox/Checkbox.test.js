import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
	const testId = 'component-checkbox';

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without error', () => {
		render(<Checkbox data-testid={testId}/>);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
	});

	it('fires the onClick callback when clicked', () => {
		const onChangeMock = jest.fn();

		render(<Checkbox data-testid={testId} onChange={onChangeMock}/>);
		fireEvent.click(screen.getByTestId(testId));
		expect(onChangeMock).toHaveBeenCalledTimes(1);
	});
});