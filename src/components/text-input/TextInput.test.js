import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput component', () => {
	const testId = 'component-text-input';

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without error', () => {
		render(<TextInput data-testid={testId}/>);
		expect(screen.getByTestId(testId)).toBeInTheDocument();
	});

	it('renders with the provided className', () => {
		const className = 'custom-class';

		render(<TextInput data-testid={testId} className={className}/>);
		expect(screen.getByTestId(testId)).toHaveClass(className);
	});

	it('forwards the ref correctly', () => {
		const ref = React.createRef();
		render(<TextInput ref={ref} />);
		const inputElement = ref.current;

		expect(inputElement).toBeDefined();
		expect(inputElement.tagName).toBe('INPUT');
	});

	it('fires the onChange event', () => {
		render(<TextInput data-testid={testId}/>);
		const inputElement = screen.getByTestId(testId);

		fireEvent.change(inputElement, {target: {value: 'New value'}});
		expect(inputElement.value).toBe('New value');
	});
});