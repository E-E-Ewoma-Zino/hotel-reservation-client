// popular rooms
import { useEffect, useState } from "react";
import { allRooms } from "../../api/get";
import host from "../../constants/host";
import RoomCard from "../roomCard/roomCard";

function PopularRooms() {
	const [rooms, setRooms] = useState([]);


	useEffect(() => {
		async function topRooms() {
			const theRoom = await allRooms();

			setRooms(theRoom.data.data);
		}

		topRooms();
	}, []);

	return (
		<section className="popular-destination-area section-gap">
			<div className="container">
				<div className="row d-flex justify-content-center">
					<div className="menu-content pb-70 col-lg-8">
						<div className="title text-center">
							<h1 className="mb-10">Popular Rooms</h1>
							<p>We all live in an age that belongs to the young at heart. Life that is becoming extremely
								fast, day.</p>
						</div>
					</div>
				</div>
				<div className="row">
					{
						rooms.length && rooms.map((room, index) => {
							if (index > 5) return null;

							return <div key={room._id} className="col-lg-4">
								<RoomCard id={room._id} name={room.name} type={room.type} price={room.price} img={host + room.images[0]?.path} />
							</div>
						})
					}
					{/* <div className="col-lg-4">
						<RoomCard name="Dream City" type="Paris" price="250" img="/assets/img/d2.jpg" />
					</div>
					<div className="col-lg-4">
						<RoomCard name="Cloud Mountain" type="Sri Lanka" price="350" img="/assets/img/d1.jpg" />
					</div>
					<div className="col-lg-4">
						<RoomCard name="Cloud Mountain" type="Sri Lanka" price="350" img="/assets/img/d1.jpg" />
					</div> */}
				</div>
			</div>
		</section>
	);
}

export default PopularRooms;