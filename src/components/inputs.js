// inputs

function Input({ type, className, name, placeholder, value, min, max, onFocusText, onBlurText, onChange, onClick, required = false }) {

	return <input
		type={type}
		className={"form-control radius-10 " + className }
		name={name}
		min={min}
		max={max}
		value={value}
		placeholder={placeholder}
		onFocus={onFocusText}
		onBlur={onBlurText}
		onChange={onChange}
		onClick={onClick}
		required={required}
	/>;
}

export default Input;