import { classList } from 'utils/stylesheet';
import Style from './Button.module.css';

const Button = ({className, children, ...props}) => (
	<button {...props} type="button" className={classList(Style.Button, className)}>
		{children}
	</button>
);

export default Button;