// All rooms 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allRooms } from "../../api/get";
import host from "../../constants/host";

function RoomList() {
	const [isLoading, setIsLoading] = useState(false);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		async function getAllRooms() {
			setIsLoading(true);

			const theRoom = await allRooms();

			setIsLoading(false);
			
			setRooms(theRoom.data.data);
		}

		getAllRooms();
	}, []);
	return (
		<div className="container">
			<div className="roomList row">
				{
					isLoading? <h4>Loading...</h4>:
					rooms.length && rooms.map(room => (
						<div className="col-12" key={room._id}>
							<div className="room">
								<div className="room-img cursor-pointer" style={{ backgroundImage: `url("${host + room.images[0]?.path.replace("uploads", "uploads/")}")` }}></div>
								<div className="room-description">
									<div className="heading">
										<h2 className="h2 name"><Link to={"/rooms/details?id=" + room._id} className="text-dark">{room.name}</Link></h2>
										<Link to="#x" className="type text-info">{room.type}</Link>
									</div>
									<div className="body">
										<p className="description">{room.description}</p>
										<span className="features">{room.features.toString()}</span>
									</div>
									<div className="footer">
										<h4 className="price h4">${room.price}</h4>
										<Link to="#x" className="book-now primary-btn text-uppercase">Book Now</Link>
									</div>
								</div>
							</div>
						</div>
					))
				}
			</div>
			<div className="Page navigation my-3">
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