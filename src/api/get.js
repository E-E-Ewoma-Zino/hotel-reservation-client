// Performs all get requests
import axios from "axios";
import host from "../constants/host";

export async function allRooms(){
	return await axios.get(host + "rooms/all");
}

export async function roomById(id){
	return await axios.get(host + "rooms/id?id=" + id);
}

const getApi = {
	allRooms,
	roomById
}

export default getApi;