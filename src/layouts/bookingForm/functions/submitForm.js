import { roomById } from "../../../api/get";
import { bookRoom } from "../../../api/post";

export default async function submitBooking({event, setBooking, setHasSetStarted, setError, cookie, navigate, location, booking, initBooking}) {
	event.preventDefault();

	// get the room being booked
	const user = cookie.meUser;
	const theRoom = await (await roomById(location.search.slice(location.search.indexOf("id") + 3, location.search.length))).data.data;

	const data = {
		...booking,
		room: theRoom._id,
		//TODO: get the payed from the payment gate way
		payed: theRoom.price,
		roomPrice: theRoom.price
	}

	localStorage.setItem("booking", JSON.stringify(data));

	if (!user) return navigate("/auth", { state: { prevPath: location.pathname + location.search } });

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
		localStorage.clear();
		setBooking(initBooking);
		setHasSetStarted(false);

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