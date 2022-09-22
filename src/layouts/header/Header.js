import NavBar from "./nav/NavBar";

function Header() {
	return (
		<header id="header">
			<div className="header-top">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-sm-6 col-6 header-top-left">
							<ul>
								<li><a href="#x">Visit Us</a></li>
								<li><a href="#x">Buy Tickets</a></li>
							</ul>
						</div>
						<div className="col-lg-6 col-sm-6 col-6 header-top-right">
							<div className="header-social">
								<a href="#x"><i className="fa fa-facebook"></i></a>
								<a href="#x"><i className="fa fa-twitter"></i></a>
								<a href="#x"><i className="fa fa-dribbble"></i></a>
								<a href="#x"><i className="fa fa-behance"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* NavBar */}
			<NavBar />
		</header>
	)
}

export default Header;