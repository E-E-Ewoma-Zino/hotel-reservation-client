// heroSection for normal screen

import { Link } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb";

function HeroSection({ name }) {
	const pathname = window.location.pathname.split('/');
	pathname.shift();

	return (
		<section className="relative about-banner">
			<div className="overlay overlay-bg"></div>
			<div className="container">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="about-content col-lg-12">
						<h1 className="text-white">
							{name}
						</h1>
						<p className="text-white link-nav">
							<Link to="/">
								Home
							</Link>
							{
								pathname.map((path, index) => <Breadcrumb path={path} crumb={index} key={index} />)
							}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection;