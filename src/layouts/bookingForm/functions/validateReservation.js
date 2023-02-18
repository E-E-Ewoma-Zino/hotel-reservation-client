import moment from "moment";

export default function validateReservation (reservedDates, booking, callback = ()=>{}) {
	let valid = false;
	const datesBeingReserved = [];

	for (let i = 0; i < moment(booking.end).diff(booking.start, "days"); i++) {
		datesBeingReserved.push(moment(booking.start).add(i, "days").format("YYYY-MM-DD"));
	}
	datesBeingReserved.push(moment(booking.end).format("YYYY-MM-DD"));

	datesBeingReserved.forEach(k => {
		reservedDates.forEach(h => {
			if (moment(k).isSame(h, "dates")) {
				valid = true;
				return callback(h);
			}
		});
	});
	return valid;
}