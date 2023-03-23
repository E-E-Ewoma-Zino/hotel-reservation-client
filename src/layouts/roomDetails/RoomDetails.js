// room details
import { useState, useEffect } from "react";
import { roomById } from "../../api/get";
import host from "../../constants/host";
import { Link, useLocation } from "react-router-dom";
import BookingForm from "../bookingForm/BookingForm";
import RoomDetailsSkeleton from "../../components/skeletons/roomDetails";

export default function Details() {
	const [room, setRoom] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();

	useEffect(() => {
		async function getRoomById() {
			const id = location.search.slice(location.search.indexOf("id") + 3, location.search.length);
			setIsLoading(true);

			try {
				const theRoom = await roomById(id);
				setIsLoading(false);
				setRoom(theRoom.data.data);
			} catch (err) {
				console.error("ERror:", err);
			}
		}
		getRoomById();
	}, [location.search]);

	return (
		<div className="container">
			{
				isLoading ? <RoomDetailsSkeleton /> : room &&
					(
						<div className="details">
							<div className="row">
								<div className="col-12 col-md-6">
									<div className="image">
										<img src={host + room.images[0]?.path} className="img-fluid" alt={room.name} />
									</div>
								</div>
								<div className="col-12 col-md-6">
									<div className="description">
										<div className="heading">
											<h2 className="h2 name"><Link to={"/rooms/details?id=" + room._id} className="text-dark">{room.name}</Link></h2>
											<Link to={"/rooms/type?type=" + room.type} className="type text-info">{room.type}</Link>
										</div>
										<div className="body">
											<p className="body">{room.description}</p>
											<span className="features">{room.features.toString()}</span>
										</div>
										<div className="footer">
											<h4 className="price h4">${room.price}</h4>
											<a href={"?id=" + room._id + "#bookingForm"} className="book-now primary-btn text-uppercase">Book Now</a>
										</div>
									</div>
								</div>
							</div>
							<div className="row my-3">
								<div className="col-12">
									<div className="img-cell">
										{
											room.images.map((img, index) => <img key={index} src={host + img?.path} className="img-fluid mx-2" alt="room" width={100} />)
										}
									</div>
								</div>
							</div>

							<div className="row mt-5 d-flex justify-content-center">
								<div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
									<BookingForm className={"banner-right border"} heading="Start Booking" css={{boxShadow: "-1px 11px 20px 4px #e5e5e5", minWidth: "50%"}} tab="d-none" />
								</div>
							</div>
						</div>
					)
				}
		</div>
	);
}