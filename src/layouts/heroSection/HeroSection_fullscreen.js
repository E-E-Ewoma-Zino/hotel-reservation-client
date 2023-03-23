// hero Section
import { Link } from "react-router-dom";
import BookingForm from "../bookingForm/BookingForm";

function HeroSectionFullScreen() {
	return (
		<section className="banner-area relative">
			<div className="overlay overlay-bg"></div>
			<div className="container">
				<div className="row fullscreen align-items-center justify-content-between" style={{ height: "55em" }}>
					<div className="col-lg-6 col-md-6 banner-left">
						<h6 className="text-white">Away from monotonous life</h6>
						<h1 className="text-white text-left">Easy Reservation</h1>
						<p className="text-white">
							If you find it hard and stressful to go over to the hotel and reserve a room, then this is a solution for you.
						</p>
						<Link to={"/rooms"} className="primary-btn text-uppercase">Get Started</Link>
					</div>
					{/* Added Booking form */}
					<BookingForm />
				</div>
			</div>
		</section>
	);
}

export default HeroSectionFullScreen;