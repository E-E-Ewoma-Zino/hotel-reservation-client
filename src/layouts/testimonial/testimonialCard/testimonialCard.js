// Testimonial Card

import UserRating from "./userRating/userRating";

function TestimonialCard({ username, review, img, rating }) {
	return (
		<div className="single-testimonial item d-flex flex-row">
			<div className="thumb">
				<img className="img-fluid" src={img} alt={username + " testimonial"} />
			</div>
			<div className="desc">
				<p>{review}</p>
				<h4>{username}</h4>
				<UserRating rating={rating} />
			</div>
		</div>
	);
}

export default TestimonialCard;