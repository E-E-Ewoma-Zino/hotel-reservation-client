// Booking form
import { useCookies } from "react-cookie";
import { roomById } from "../../api/get";
import { bookRoom } from "../../api/post";
import Alert from "../../components/alert";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { Grid } from "@mui/material";

function BookingForm({ className, css, tab, heading }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [cookie] = useCookies(["userCookie"]);

	const initBooking = useMemo(() => {
		return {
			start: moment(),
			end: null,
			noOfAdults: '',
			noOfChildren: ''
		}
	}, []);



	// DatePicker has renderDay prop which we can use to customize the day cells of the calendar. It takes 3 arguments, the first one is the Date object, which we can use to compare with the array of dates that should be disabled:

	const dates = ["2023-02-18", "2023-02-24", "2023-02-20"];

	const customDayRenderer = (date, selectedDates, pickersDayProps) => {
		const stringifiedDate = moment(date).format("YYYY-MM-DD");
		if (dates.includes(stringifiedDate)) {
			return <PickersDay {...pickersDayProps} disabled />;
		}
		return <PickersDay {...pickersDayProps} />;
	};


	const [booking, setBooking] = useState(initBooking);
	const [error, setError] = useState({
		isError: false,
		message: "",
		title: "",
		alert: ""
	});

	useEffect(() => {
		function getBookingDetails() {
			if (cookie.meUser) {
				setBooking(JSON.parse(localStorage.getItem("booking")));
			}
			localStorage.setItem("booking", JSON.stringify(initBooking));
		}
		getBookingDetails();
	}, [location.pathname, cookie.meUser, initBooking]);

	function handleTextChange(event) {
		const { name, value } = event.target;

		setBooking(prev => {
			return {
				...prev,
				[name]: value
			}
		});
	}

	function handleDateChange(event, name) {

		if (name === "start" && !booking.end) setBooking(prev => {
			return {
				...prev,
				[name]: event,
				end: event
			}
		});
		else setBooking(prev => {
			return {
				...prev,
				[name]: event
			}
		});
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
			setBooking(initBooking);
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
		<LocalizationProvider dateAdapter={AdapterMoment}>
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
							<Grid container spacing={2} my="1em">
								<Grid item xs={12} sm={6} width="100%">
									<DatePicker
										label="Check In"
										className="w-100"
										disablePast={true}
										value={booking.start}
										// shouldDisableDate={()=> }
										renderDay={customDayRenderer}
										onChange={e => handleDateChange(e, "start")}
										renderInput={(params) => <TextField {...params} />}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<DatePicker
										className="w-100"
										disablePast={true}
										label="Check Out"
										value={booking.end}
										onChange={e => handleDateChange(e, "end")}
										renderInput={(params) => <TextField {...params} />}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} width="100%" maxWidth="100%">
									<TextField id="outlined-basic" className="w-100" label="Adult" type="number" variant="outlined" name="noOfAdults" onChange={handleTextChange} value={booking.noOfAdults} />
								</Grid>
								<Grid item xs={12} sm={6} width="100%" maxWidth="100%">
									<TextField id="outlined-basic" className="w-100" label="Children" type="number" variant="outlined" name="noOfChildren" onChange={handleTextChange} value={booking.noOfChildren} />
								</Grid>
							</Grid>
							<button type="submit" className="primary-btn text-uppercase" onClick={submitBooking}>Start Booking</button>
							{
								error.isError &&
								<div className="mt-3">
									{console.log("err", error)}
									<Alert title={error.title} message={error.message} alert={error.alert} />
								</div>
							}
						</form>
					</div>
				</div>
			</div>
		</LocalizationProvider>
	);
}

export default BookingForm;