// footer

import { Link } from "react-router-dom";

function Footer() {
	function handelBlur_handleFocus(event, str) {
		event.target.placeholder = str;
	}

	return (
		<footer className="footer-area section-gap">
			<div className="container">

				<div className="row">
					<div className="col-lg-3  col-md-6 col-sm-6">
						<div className="single-footer-widget">
							<h6>About</h6>
							<p>
								Hotel reservation and payment tracking system is a project set on the purpose of reducing the amount of stress and time it take an individual to reserve a room in a hotel. And also to provide a simpler means of tracking payment of rooms.
							</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div className="single-footer-widget">
							<h6>Navigation Links</h6>
							<div className="row">
								<div className="col">
									<ul>
										<li><Link to="/">Home</Link></li>
									</ul>
								</div>
								<div className="col">
									<ul>
										<li><Link to="/rooms">Rooms</Link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3  col-md-6 col-sm-6">
						<div className="single-footer-widget">
							<h6>Newsletter</h6>
							<p>
								For business professionals caught between high OEM price and mediocre print and graphic
								output.
							</p>
							<div id="mc_embed_signup">
								<form target="_blank"
									action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
									method="get" className="subscription relative">
									<div className="input-group d-flex flex-row">
										<input name="EMAIL" placeholder="Email Address" onFocus={(event) => handelBlur_handleFocus(event, '')} onBlur={(event) => handelBlur_handleFocus(event, "Email Address")} required="" type="email" />
										<button className="btn bb-btn"><span className="lnr lnr-location"></span></button>
									</div>
									<div className="mt-10 info"></div>
								</form>
							</div>
						</div>
					</div>
					<div className="col-lg-3  col-md-6 col-sm-6">
						<div className="single-footer-widget mail-chimp">
							<h6 className="mb-20">InstaFeed</h6>
							<ul className="instafeed d-flex flex-wrap">
								<li><img src="/assets/img/i1.jpg" alt="" /></li>
								<li><img src="/assets/img/i2.jpg" alt="" /></li>
								<li><img src="/assets/img/i3.jpg" alt="" /></li>
								<li><img src="/assets/img/i4.jpg" alt="" /></li>
								<li><img src="/assets/img/i5.jpg" alt="" /></li>
								<li><img src="/assets/img/i6.jpg" alt="" /></li>
								<li><img src="/assets/img/i7.jpg" alt="" /></li>
								<li><img src="/assets/img/i8.jpg" alt="" /></li>
							</ul>
						</div>
					</div>
				</div>

				<div className="row footer-bottom d-flex justify-content-between align-items-center">
					<p className="col-lg-8 col-sm-12 footer-text m-0">
						{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
						Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="fa fa-heart-o"
							aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
						{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
					</p>
					<div className="col-lg-4 col-sm-12 footer-social">
						<a href="#x"><i className="fa fa-facebook"></i></a>
						<a href="#x"><i className="fa fa-twitter"></i></a>
						<a href="#x"><i className="fa fa-dribbble"></i></a>
						<a href="#x"><i className="fa fa-behance"></i></a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;