// Performs all get requests
import axios from "axios";
import host from "../constants/host";

const errMessage = (err) => window.swalWithBootstrapButtons.fire({
	icon: "error",
	title: "Could not Connect!",
	text: `${err}`,
	showConfirmButton: true
}).then(()=> window.location.reload());

export async function allRooms(opt = ''){
	try{
		return await axios.get(host + "rooms/all?type=" + opt);
	}catch(err){
		console.error("Error::", err);
		errMessage(err?.response?.data? err.response.data.message: "Check your internet connection and try again!");
	}
}

export async function roomById(id){
	try{
		return await axios.get(host + "rooms/id?id=" + id);
	}catch(err){
		console.error("Error::", err);
		errMessage(err?.response?.data? err.response.data.message: "Check your internet connection and try again!");
	}
}

export async function getReservedDates(){
	try{
		return await axios.get(host + "tracking/reserved");
	}catch(err){
		console.error("Error::", err);
		errMessage(err?.response?.data? err.response.data.message: "Check your internet connection and try again!");
	}
}

const getApi = {
	allRooms,
	roomById,
	getReservedDates
}

export default getApi;