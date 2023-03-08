import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/auth";
import Header from "../layouts/header/Header";
import About from "../pages/about";
import Contact from "../pages/contact";
import Home from "../pages/home";
import RoomDetails from "../pages/roomDetails";
import RoomType from "../pages/roomType";
import Rooms from "../pages/rooms";
import Footer from "../layouts/footer/footer";
import allScripts from "./scripts/allScripts";
import Script from "./scripts/Script";
import { useEffect, useState } from "react";
import ScrollToTopOnMount from "./scrollToTopOnMount";

function App() {
	const [jsScripts, setScripts] = useState([]);

	useEffect(() => {
		setScripts(Object.values(allScripts));
	}, []);

	return (
		<BrowserRouter>
			<Header />
			{/* Add all script */}
			{
				jsScripts.map((src, index) => <Script key={index} src={src} />)
			}
			<ScrollToTopOnMount />
			<Routes>
				<Route index element={<Navigate to="/home" />} />
				<Route path="/home" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/rooms">
					<Route index element={<Rooms />} />
					<Route path="details" element={<RoomDetails />} />
					<Route path="type" element={<RoomType />} />
				</Route>
				<Route path="*" element={<h1 style={{ margin: "5em auto" }}>No Page 404</h1>} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;