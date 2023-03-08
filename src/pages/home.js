import CustomerRequest from "../layouts/customerRequest/CustomerRequest";
import HeroSectionFullScreen from "../layouts/heroSection/HeroSection_fullscreen";
import OtherServices from "../layouts/otherServices/otherServices";
import PopularRooms from "../layouts/popularRooms/PopularRooms";
// import TestimonialSection from "../layouts/testimonial/testimonialSection";


function Home() {
	

	return (
		<>
			<HeroSectionFullScreen />
			<PopularRooms />
			<OtherServices />
			{/* <TestimonialSection /> */}
			<CustomerRequest />
		</>
	);
}

export default Home;