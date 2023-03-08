// Booking form
import moment from "moment";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Grid } from "@mui/material";
import { useCookies } from "react-cookie";
import Alert from "../../components/alert";
import TextField from '@mui/material/TextField';
import { getReservedDates } from "../../api/get";
import submitBooking from "./functions/submitForm";
import getStartDate from "./functions/getStartDate";
import { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import customDayRenderer from "./functions/customDayRenderer";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import validateReservation from "./functions/validateReservation";

function BookingForm({ className, css, tab, heading }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [cookie] = useCookies(["userCookie"]);
	const [reservedDates, setReservedDates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hasSetStarted, setHasSetStarted] = useState(false);

	const initBooking = useMemo(() => {
		return {
			start: moment(),
			end: null,
			noOfAdults: '',
			noOfChildren: ''
		}
	}, []);

	const [booking, setBooking] = useState(initBooking);
	const [error, setError] = useState({
		isError: false,
		message: "",
		title: "",
		alert: ""
	});

	function handleDateChange(event, name) {
		if (name === "start" && !booking.end) setBooking(prev => {
			return {
				...prev,
				[name]: event,
				end: event
			}
		});
		else setBooking(prev => {
			if(!validateReservation(reservedDates, {
				...prev,
				[name]: event
			}, (repetedDate) => {
				setBooking({ ...booking, start: null, end: null });
				window.swalWithBootstrapButtons.fire({
					icon: "warning",
					title: "Not Available",
					text: `This room has already been reserved on the ${repetedDate}. 
					Select days that hasn't been reserved in between`,
					showConfirmButton: true
				});
			})) return {
				...prev,
				[name]: event
			};
			else return { ...prev }
		});
	}

	function handleTextChange(event) {
		const { name, value } = event.target;

		setBooking(prev => {
			return {
				...prev,
				[name]: value
			}
		});
	}

	useEffect(() => {
		function getBookingDetails() {
			if (localStorage.getItem("booking")) {
				setBooking(JSON.parse(localStorage.getItem("booking")));
			}
		}

		async function getRDates() {
			const resev = await (await getReservedDates()).data;
			setReservedDates(resev.data);
			setLoading(false);
			if(!hasSetStarted) {
				setHasSetStarted(true);
				setBooking(pre => { return {...pre, start: getStartDate(resev.data)}});
			}
		}

		getRDates();
		getBookingDetails();
	}, [location.pathname, cookie.meUser, initBooking, loading, hasSetStarted]);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<div id="bookingForm" className={className || "col-lg-4 col-md-6 banner-right"} style={css}>
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
										renderDay={(date, selectedDay, pickerDayProp) => customDayRenderer(date, selectedDay, pickerDayProp, reservedDates)}
										onChange={e => handleDateChange(e, "start")}
										renderInput={(params) => <TextField {...params} />}
										required
										disabled={loading}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<DatePicker
										className="w-100"
										minDate={moment(booking.start).add(1, "day")}
										label="Check Out"
										value={booking.end}
										renderDay={(date, selectedDay, pickerDayProp) => customDayRenderer(date, selectedDay, pickerDayProp, reservedDates)}
										onChange={e => handleDateChange(e, "end")}
										renderInput={(params) => <TextField {...params} />}
										required
										disabled={loading}
									/>
								</Grid>
								<Grid item xs={12} sm={6} width="100%" maxWidth="100%">
									<TextField id="outlined-basic" className="w-100" label="Adult" type="number" variant="outlined" name="noOfAdults" onChange={handleTextChange} value={booking.noOfAdults} disabled={loading} />
								</Grid>
								<Grid item xs={12} sm={6} width="100%" maxWidth="100%">
									<TextField id="outlined-basic" className="w-100" label="Children" type="number" variant="outlined" name="noOfChildren" onChange={handleTextChange} value={booking.noOfChildren} disabled={loading} />
								</Grid>
							</Grid>
							<button type="submit" className="primary-btn text-uppercase" onClick={(e) => submitBooking({ event: e, setBooking, setHasSetStarted, setError, cookie, navigate, location, booking, initBooking })}>Start Booking</button>
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