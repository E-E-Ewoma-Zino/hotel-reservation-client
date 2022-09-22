// buttons

function Button({ text, size, color, type, outline, shape, onClick}){
	return <button type={type || "button"} className={"genric-btn " + size + ' ' + color + ' ' + outline + ' ' + shape } onClick={onClick}>{text}</button>
}

export default Button;