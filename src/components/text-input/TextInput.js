import { forwardRef } from 'react';
import { classList } from 'utils/stylesheet';
import Style from './TextInput.module.css';

const TextInput = forwardRef(({className, ...props}, ref) => (
	<input {...props} ref={ref} type="text" className={classList(Style.TextInput, className)} />
));

export default TextInput;