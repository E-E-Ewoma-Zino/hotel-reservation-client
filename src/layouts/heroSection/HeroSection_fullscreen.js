// hero Section
import BookingForm from "../bookingForm/BookingForm";

function HeroSectionFullScreen() {
	return (
		<section className="banner-area relative">
			<div className="overlay overlay-bg"></div>
			<div className="container">
				<div className="row fullscreen align-items-center justify-content-between" style={{ height: "55em" }}>
					<div className="col-lg-6 col-md-6 banner-left">
						<h6 className="text-white">Away from monotonous life</h6>
						<h1 className="text-white">Magical Travel</h1>
						<p className="text-white">
							If you are looking at blank cassettes on the web, you may be very confused at the difference in
							price. You may see some for as low as $.17 each.
						</p>
						<a href="#x" className="primary-btn text-uppercase">Get Started</a>
					</div>
					{/* Added Booking form */}
					<BookingForm />
				</div>
			</div>
		</section>
	);
}

export default HeroSectionFullScreen;