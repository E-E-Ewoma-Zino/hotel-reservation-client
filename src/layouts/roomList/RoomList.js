// All rooms 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allRooms } from "../../api/get";
import host from "../../constants/host";

function RoomList({ opt }) {
	const [isLoading, setIsLoading] = useState(false);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		async function getAllRooms() {
			setIsLoading(true);

			const theRoom = await allRooms(opt);

			setIsLoading(false);

			setRooms(theRoom.data.data);
		}

		getAllRooms();
	}, [opt]);
	return (
		<div className="container">
			<div className="roomList row">
				{
					isLoading ? <h4>Loading...</h4> :
						rooms.length && rooms.map(room => (
							<div className="col-sm-12 col-xl-6" key={room._id}>
								<div className="room">
									<Link to={"/rooms/details?id=" + room._id}>
										<div className="room-img cursor-pointer" style={{ backgroundImage: `url("${host + room.images[0]?.path.replace("uploads", "uploads/")}")` }}></div>
									</Link>
									<div className="room-description">
										<div className="heading">
											<h2 className="h2 name"><Link to={"/rooms/details?id=" + room._id} className="text-dark">{room.name}</Link></h2>
											<Link to={"/rooms/type?type=" + room.type} className="type text-info">{room.type}</Link>
										</div>
										<div className="body">
											<p className="description">{room.description}</p>
											<span className="features">{room.features.toString()}</span>
										</div>
										<div className="footer">
											<h4 className="price h4">${room.price}</h4>
											<Link to={"/rooms/details?id=" + room._id} className="book-now primary-btn text-uppercase">Book Now</Link>
										</div>
									</div>
								</div>
							</div>
						))
				}
			</div>
			{/* NOTE: d-none for pagination */}
			<div className="Page navigation my-3 d-none">
				<ul className="pagination justify-content-center align-items-center">
					<li className="page-item disabled">
						<a href="#x" className="page-link text-dark">Previous</a>
					</li>
					<li className="page-item active">
						<a href="#x" className="page-link text-dark">1</a>
					</li>
					<li className="page-item">
						<a href="#x" className="page-link text-dark">2</a>
					</li>
					<li className="page-item">
						<a href="#x" className="page-link text-dark">3</a>
					</li>
					<li className="page-item">
						<a href="#x" className="page-link text-dark">4</a>
					</li>
					<li className="page-item">
						<a href="#x" className="page-link text-dark">Next</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default RoomList;