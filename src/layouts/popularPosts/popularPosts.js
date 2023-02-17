// Popular posts 

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allRooms } from "../../api/get";
import host from "../../constants/host";

function PopularPosts() {

	const [rooms, setRooms] = useState([]);


	useEffect(() => {
		async function topRooms() {
			const theRoom = await allRooms();

			setRooms(theRoom.data.data);
		}

		topRooms();
	}, []);

	return (
		<div className="single-sidebar-widget popular-post-widget">
			<h4 className="popular-title">Popular Posts</h4>
			<div className="popular-post-list">
				{
					rooms.map((room, index) => {
						if (index > 4) return null;

						return <div className="single-post-list d-flex flex-row align-items-center" key={room._id}>
							<div className="thumb">
								<img className="img-fluid" style={{width: "64px"}} src={host + room.images[0].path} alt={room.name} />
							</div>
							<div className="details">
								<Link to={"/rooms/details?id=" + room._id}><h6>{room.name}</h6></Link>
								{/* <p>02 Hours ago</p> */}
							</div>
						</div>
					})
				}
			</div>
		</div>
	);
}

export default PopularPosts;