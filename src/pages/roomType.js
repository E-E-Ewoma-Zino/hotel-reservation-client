// Rooms page 
import RoomList from "../layouts/roomList/RoomList";
import HeroSection from "../layouts/heroSection/HeroSection";
import { useLocation } from "react-router-dom";

function RoomType() {
	const location = useLocation();
	const type = location.search.substring(location.search.search("=") + 1);

	console.log(type);

	return (
		<>
			<HeroSection name={type.replace("%20", ' ')} />
			<RoomList opt={type} />			
		</>
	);
}

export default RoomType;