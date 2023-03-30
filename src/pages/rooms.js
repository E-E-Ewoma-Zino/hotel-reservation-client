// Rooms page 
import Footer from "../layouts/footer/footer";
import RoomList from "../layouts/roomList/RoomList";
import HeroSection from "../layouts/heroSection/HeroSection";

function Rooms(){
	return (
		<>
			<HeroSection name="All Rooms" />
			<RoomList />
			<Footer />
		</>
	);
}

export default Rooms;