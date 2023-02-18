import moment from "moment";

export default function getStartDate (reservedDates){
	let start = moment().format("YYYY-MM-DD");
	
	for (let i = 0; i < reservedDates.length; i++) {
		const r = reservedDates[i];
		
		if(moment(start).format("YYYY-MM-DD") === r) {
			start = moment(start).add(1, "day").format("YYYY-MM-DD");
			i = 0;
		}
	}

	return start;
}