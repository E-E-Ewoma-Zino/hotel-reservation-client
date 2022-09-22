// Performs all post requests
import axios from "axios";
import host from "../constants/host";

// @desc	function to log a user into our site
// @return	it returns an obj which contains the user
export async function logInUser(data){
	return await axios.post(host + "auth/user/login", data);
}

// @desc	function to log a user into our site
// @return	it returns an obj which contains the user
export async function registerUser(data){
	return await axios.post(host + "auth/user/register", data);
}

// @desc	function to add an new room to the db
// return	it returns an obj which shows fail or success
export async function addRoom(data){
	return await axios.post(host + "rooms/add", data);
}

// @desc	function to book a room
// return	it returns an obj which shows fail or success
export async function bookRoom(data){
	return await axios.post(host + "bookings/add", data);
}

const postApi = {
	addRoom,
	logInUser,
	registerUser,
	bookRoom
}

export default postApi;