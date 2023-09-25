import { useEffect } from 'react';
import { useStateWithCallbackLazy } from 'hooks/useStateWithCallback';
import { classList } from 'utils/stylesheet';
import { getValueInRange } from 'utils/number';
import Style from './Slider.module.css';

const calcPercentage = (value, min, max) => {
	if (min < max) {
		return (value - min) / (max - min) * 100;
	}

	return 0;
};

const Slider = ({className, value, min, max, onChange, ...props}) => {
	const [currentValue, setCurrentValue] = useStateWithCallbackLazy(getValueInRange(value, min, max));
	const offset = calcPercentage(currentValue, min, max);

	useEffect(() => {
		setCurrentValue(getValueInRange(value, min, max), null);
	}, [setCurrentValue, value, min, max]);

	return (
		<div className={classList(Style.Container, className)}>
			<input
				{...props}
				type="range"
				min={min}
				max={max}
				value={currentValue}
				onChange={(event) => setCurrentValue(getValueInRange(event.target.value, min, max), onChange)}
			/>
			<div className={Style.SliderContainer}>
				<div className={Style.Slider}>
					<div className={Style.SliderFill} style={{width: `${offset}%`}}></div>
				</div>
				<div className={Style.Thumb} style={{left: `${offset}%`}}></div>
			</div>
		</div>
	);
};

export default Slider;