// Customer Request

function CustomerRequest() {
	return (
		<section className="home-about-area">
			<div className="container-fluid">
				<div className="row align-items-center justify-content-end">
					<div className="col-lg-6 col-md-12 home-about-left">
						<h1>
							Hotel Reservation and <br />
							Payment Tracking System <br />
							Designed by Ewoma
						</h1>
						<p>
							Hotel reservation and payment tracking system is a project set on the 
							purpose of reducing the amount of stress and time it take an 
							individual to reserve a room in a hotel. And also to provide a simpler 
							means of tracking payment of rooms.
						</p>
						<a href="#top" className="primary-btn text-uppercase">Back to top</a>
					</div>
					<div className="col-lg-6 col-md-12 home-about-right no-padding">
						<img className="img-fluid" src="/assets/img/about-img.jpg" alt="" />
					</div>
				</div>
			</div>
		</section>
	);
}

export default CustomerRequest;