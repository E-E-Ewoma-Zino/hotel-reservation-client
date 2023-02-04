// Booking form
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roomById } from "../../api/get";
import { bookRoom } from "../../api/post";
import Alert from "../../components/alert";
import Input from "../../components/inputs";

function BookingForm({ className, css, tab, heading }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [booking, setBooking] = useState({
		start: '',
		end: '',
		noOfAdults: '',
		noOfChildren: ''
	});

	const [error, setError] = useState({
		isError: false,
		message: "",
		title: "",
		alert: ""
	});

	function handleChange(event) {
		const { name, value } = event.target;

		setBooking(prev => {
			return {
				...prev,
				[name]: value
			}
		});
	}

	function handleBlur(event) {
		setTimeout(() => {
			const { name, value } = event.target;

			setBooking(prev => {
				return {
					...prev,
					[name]: value
				}
			});
		}, 1000);
	}

	async function submitBooking(event) {
		event.preventDefault();

		const user = window.localStorage.getItem("user");
		console.log("user", user);
		if (!user) navigate("/auth", { state: { prevPath: location.pathname + location.search } });

		// get the room being booked
		const theRoom = await (await roomById(location.search.slice(location.search.indexOf("id") + 3, location.search.length))).data.data;

		const data = {
			...booking,
			room: theRoom._id,
			user: JSON.parse(user)._id,
			//TODO: get the payed from the payment gate way
			payed: theRoom.price,
			roomPrice: theRoom.price
		}

		return;
		try {
			const book = await bookRoom(data);
			console.log("success", book.data);
		} catch (err) {
			console.error("Error in booking:", err);
			setError({
				isError: true,
				message: err.response.data.message,
				title: err.response.data.err,
				alert: err.response.data.alert
			});
		}
	}

	return (
		<div className={className || "col-lg-4 col-md-6 banner-right"} style={css}>
			<ul className={"nav nav-tabs" + tab} id="myTab" role="tablist">
				<li className="nav-item">
					<a className="nav-link active" id="hotel-tab" data-toggle="tab" href="#xhotel" role="tab"
						aria-controls="hotel" aria-selected="false">Booking</a>
				</li>
			</ul>
			{heading && <h3 className="text-center">{heading}</h3>}
			<div className="tab-content" id="myTabContent">
				<div className="tab-pane fade show active" id="hotel" role="tabpanel" aria-labelledby="hotel-tab">
					<form className="form-wrap">
						<Input type="text" className="date-picker" name="start" placeholder={booking.start === '' ? "Start " : ""} value={booking.from} onFocusText={event => event.target.placeholder = ""} onChange={() => { }} onBlurText={handleBlur} required={true} />
						<Input type="text" className="date-picker" name="end" placeholder={booking.end === '' ? "End " : ""} value={booking.to} onFocusText={event => event.target.placeholder = ""} onChange={() => { }} onBlurText={handleBlur} required={true} />
						<Input type="number" min="1" max="20" name="noOfAdults" placeholder={booking.noOfAdults === '' ? "Adult no " : ""} value={booking.noOfAdults} onFocusText={event => event.target.placeholder = ""} onChange={handleChange} required={true} />
						<Input type="number" min="1" max="20" name="noOfChildren" placeholder={booking.noOfChildren === '' ? "Child no " : ""} value={booking.noOfChildren} onFocusText={event => event.target.placeholder = ""} onChange={handleChange} required={true} />
						<button type="submit" className="primary-btn text-uppercase" onClick={submitBooking}>Start Booking</button>
						{
							error.isError &&
							<div className="mt-3">
								<Alert title={error.title} message={error.message} alert={error.alert} />
							</div>
						}
					</form>
				</div>
			</div>
		</div>
	);
}

export default BookingForm;