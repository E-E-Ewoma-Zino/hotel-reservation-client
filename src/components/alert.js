// alert

function Alert({ title, message, alert }) {
	return (
		<div className={`alert alert-${alert} fade show`}>
			<strong>{title}:</strong> {message}
		</div>
	);
}

export default Alert;