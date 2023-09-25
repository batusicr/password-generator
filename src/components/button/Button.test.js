import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
	const testId = 'component-button';

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without error', () => {
		render(<Button data-testid={testId}/>);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
	});

	it('renders with children', () => {
		const buttonText = 'Click me';

		render(<Button>{buttonText}</Button>);
		expect(screen.getByText(buttonText)).toBeInTheDocument();
	});

	it('renders with the provided className', () => {
		const className = 'custom-class';

		render(<Button data-testid={testId} className={className}/>);
		expect(screen.getByTestId(testId)).toHaveClass(className);
	});

	it('fires the onClick callback when clicked', () => {
		const onClickMock = jest.fn();

		render(<Button data-testid={testId} onClick={onClickMock}/>);
		fireEvent.click(screen.getByTestId(testId));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
});