import moment from 'moment';
import { PickersDay } from '@mui/x-date-pickers';

// DatePicker has renderDay prop which we can use to customize the day cells of the calendar. It takes 3 arguments, the first one is the Date object, which we can use to compare with the array of dates that should be disabled:

export default function customDayRenderer(date, selectedDates, pickersDayProps, reservedDates) {
	const stringifiedDate = moment(date).format("YYYY-MM-DD");
	if (reservedDates.includes(stringifiedDate)) {
		return <PickersDay style={{ color: "red", textDecoration: "line-through" }} {...pickersDayProps} disabled />;
	}
	return <PickersDay {...pickersDayProps} />;
};