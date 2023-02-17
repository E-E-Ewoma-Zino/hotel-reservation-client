// Performs all get requests
import axios from "axios";
import host from "../constants/host";

export async function allRooms(){
	return await axios.get(host + "rooms/all");
}

export async function roomById(id){
	return await axios.get(host + "rooms/id?id=" + id);
}

export async function getCurrentUser(){
	return await axios.get(host + "user/");
}

const getApi = {
	allRooms,
	roomById,
	getCurrentUser
}

export default getApi;