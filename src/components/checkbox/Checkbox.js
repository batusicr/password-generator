import { classList } from 'utils/stylesheet';
import Style from './Checkbox.module.css';

const Checkbox = ({className, ...props}) => (
	<label className={classList(Style.Checkbox, className)} onClick={(e) => e.stopPropagation()}>
		<input type="checkbox" {...props} />
		<span></span>
	</label>
);

export default Checkbox;