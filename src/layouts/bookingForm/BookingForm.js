// Booking form
import { useCookies } from "react-cookie";
import { roomById } from "../../api/get";
import { bookRoom } from "../../api/post";
import Alert from "../../components/alert";
import Input from "../../components/inputs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingForm({ className, css, tab, heading }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [cookie] = useCookies(["userCookie"])

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

	useEffect(() => {
		function getBookingDetails() {
			if (cookie.meUser){
				setBooking(JSON.parse(localStorage.getItem("booking")));
			}
			localStorage.setItem("booking", JSON.stringify({
				start: '',
				end: '',
				noOfAdults: '',
				noOfChildren: ''
			}));
		}
		getBookingDetails();
	}, [location.pathname, cookie.meUser]);

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
		
		// get the room being booked
		const theRoom = await (await roomById(location.search.slice(location.search.indexOf("id") + 3, location.search.length))).data.data;
		const user = cookie.meUser;

		const data = {
			...booking,
			room: theRoom._id,
			//TODO: get the payed from the payment gate way
			payed: theRoom.price,
			roomPrice: theRoom.price
		}

		localStorage.setItem("booking", JSON.stringify(data));
		
		if (!user) navigate("/auth", { state: { prevPath: location.pathname + location.search } });

		const theData = {
			...data,
			user: user._id
		}

		try {
			const book = await bookRoom(theData);
			window.swalWithBootstrapButtons.fire({
				icon: 'success',
				title: "Thanks for reserving with us",
				text: "We will be waiting for you on the day of arrival",
				showConfirmButton: true
			});
			setBooking({
				start: '',
				end: '',
				noOfAdults: '',
				noOfChildren: ''
			});
			localStorage.clear();
			
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
						<Input type="text" className="date-picker" name="start" placeholder={booking.start === '' ? "Start " : ""} value={booking.start} onFocusText={event => event.target.placeholder = ""} onChange={() => { }} onBlurText={handleBlur} required={true} />
						<Input type="text" className="date-picker" name="end" placeholder={booking.end === '' ? "End " : ""} value={booking.end} onFocusText={event => event.target.placeholder = ""} onChange={() => { }} onBlurText={handleBlur} required={true} />
						<Input type="number" min="1" max="20" name="noOfAdults" placeholder={booking.noOfAdults === '' ? "Adult no " : ""} value={booking.noOfAdults} onFocusText={event => event.target.placeholder = ""} onChange={handleChange} required={true} />
						<Input type="number" min="1" max="20" name="noOfChildren" placeholder={booking.noOfChildren === '' ? "Child no " : ""} value={booking.noOfChildren} onFocusText={event => event.target.placeholder = ""} onChange={handleChange} required={true} />
						<button type="submit" className="primary-btn text-uppercase" onClick={submitBooking}>Start Booking</button>
						{
							error.isError &&
							<div className="mt-3">
								{console.log( "err", error)}
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


// () => {
// 	const [startDate, setStartDate] = useState(new Date("2014/02/08"));
// 	const [endDate, setEndDate] = useState(new Date("2014/02/10"));
// 	return (
// 	  <>
// 		<DatePicker
// 		  selected={startDate}
// 		  onChange={(date) => setStartDate(date)}
// 		  selectsStart
// 		  startDate={startDate}
// 		  endDate={endDate}
// 		/>
// 		<DatePicker
// 		  selected={endDate}
// 		  onChange={(date) => setEndDate(date)}
// 		  selectsEnd
// 		  startDate={startDate}
// 		  endDate={endDate}
// 		  minDate={startDate}
// 		/>
// 	  </>
// 	);
//   };