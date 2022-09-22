// Room card

function RoomCard({ name, type, price, img }) {
	return (
		<div className="single-destination relative">
			<div className="thumb relative">
				<div className="overlay overlay-bg"></div>
				<img className="img-fluid" src={img} alt={name} />
			</div>
			<div className="desc">
				<a href="#x" className="price-btn">${price}</a>
				<h4>{name}</h4>
				<p>{type}</p>
			</div>
		</div>
	);
}

export default RoomCard;