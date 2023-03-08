// Room card

import { Link } from "react-router-dom";

function RoomCard({ id, name, type, price, img }) {
	return (
		<div className="single-destination relative mb-1">
			<div className="thumb relative">
				<div className="overlay overlay-bg"></div>
				<img className="img-fluid" src={img} alt={name} />
			</div>
			<div className="desc">
				<Link to={"/rooms/details?id=" + id} className="price-btn">${price}</Link>
				<h4>{name}</h4>
				<p>{type}</p>
			</div>
		</div>
	);
}

export default RoomCard;