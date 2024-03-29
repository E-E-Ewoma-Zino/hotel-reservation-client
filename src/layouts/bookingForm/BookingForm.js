// Booking form
import moment from "moment";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid } from "@mui/material";
import { bookRoom } from "../../api/post";
import { useCookies } from "react-cookie";
import Alert from "../../components/alert";
import TextField from "@mui/material/TextField";
import { getReservedDates, roomById } from "../../api/get";
import getStartDate from "./functions/getStartDate";
import { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import customDayRenderer from "./functions/customDayRenderer";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import validateReservation from "./functions/validateReservation";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

function BookingForm({ className, css, tab, heading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookie] = useCookies(["userCookie"]);
  const [reservedDates, setReservedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSetStarted, setHasSetStarted] = useState(false);
  const [myFwConfig, setFwConfig] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const initBooking = useMemo(() => {
    return {
      start: moment(),
      end: null,
      noOfAdults: "",
      noOfChildren: ""
    };
  }, []);

  const [booking, setBooking] = useState(initBooking);
  const [error, setError] = useState({
    isError: false,
    message: "",
    title: "",
    alert: ""
  });

  function handleDateChange(event, name) {
    if (name === "start" && !booking.end)
      setBooking((prev) => {
        return {
          ...prev,
          [name]: event,
          end: event
        };
      });
    else
      setBooking((prev) => {
        if (
          !validateReservation(
            reservedDates,
            {
              ...prev,
              [name]: event
            },
            (repetedDate) => {
              setBooking({ ...booking, start: null, end: null });
              window.swalWithBootstrapButtons.fire({
                icon: "warning",
                title: "Not Available",
                text: `This room has already been reserved on the ${repetedDate}. 
					Select days that hasn't been reserved in between`,
                showConfirmButton: true
              });
            }
          )
        )
          return {
            ...prev,
            [name]: event
          };
        else return { ...prev };
      });
  }

  function handleTextChange(event) {
    const { name, value } = event.target;

    setBooking((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const fwAction = {
    callback: async (response) => {
      console.log("FWResponse", response);
      closePaymentModal(); // this will close the modal programmatically

      // Actually submitting the form
      try {
        const theData = {
          ...myFwConfig.data,
          flutterWave: response
        };

        const book = await bookRoom(theData);

        console.log("here", book);
        if (book.data.err) {
          return window.swalWithBootstrapButtons.fire({
            icon: "error",
            title: "Oops! Something went wrong.",
            text: "Contact our customer support for what to do next",
            showConfirmButton: true
          });
        }

        localStorage.clear();
        setBooking(initBooking);
        setHasSetStarted(false);
        setHasSubmitted(false);
        setFwConfig(null);

        window.swalWithBootstrapButtons
          .fire({
            icon: "success",
            title: "Thanks for reserving with us",
            text: "We will be waiting for you on the day of arrival",
            confirmButtonText: "View Invoice",
            confirmButtonAriaLabel: "Your invoice",
            cancelButtonText: "Close",
            focusConfirm: true,
            showCancelButton: true,
            showConfirmButton: true
          })
          .then((btnResult) => {
            if (btnResult.isConfirmed)
              navigate("/invoice", { state: { invoice: book.data.data } });
          });

        console.log("success", book.data);
      } catch (err) {
        console.error("Error in booking:", err);
        setError({
          isError: true,
          message: err.response.data.message,
          title: err.response.data.err,
          alert: err.response.data.alert
        });
      }
    },
    onClose: (e) => {
      console.log("I have close", e);
      setHasSubmitted(!e);
      setFwConfig(null);

      window.swalWithBootstrapButtons.fire({
        icon: "error",
        title: "Aborted!",
        text: "You have canceled the reservation",
        showConfirmButton: true
      });
    }
  };

  async function submitForm(e) {
    e.preventDefault();
    const user = cookie.meUser;
    const roomId = location.search.slice(
      location.search.indexOf("id") + 3,
      location.search.length
    );

    // get the room being booked
    localStorage.setItem("booking", JSON.stringify({ ...booking }));

    if (roomId === "")
      return navigate("/rooms", {
        state: { prevPath: location.pathname + location.search }
      });

    const theRoom = await (await roomById(roomId)).data.data;

    if (!user)
      return navigate("/auth", {
        state: { prevPath: location.pathname + location.search }
      });

    if (!booking.end)
      return window.swalWithBootstrapButtons.fire({
        icon: "warning",
        title: "Missing Field",
        text: "Please select a check out date",
        showConfirmButton: true
      });

    // =========== Flutter wave part
    const config = {
      public_key: "FLWPUBK_TEST-88cd4a7dc50e807c5da141b586b3a656-X",
      tx_ref: theRoom._id + "-" + Date.now(),
      amount: theRoom.price,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: user.username,
        // phone_number: user.phone,
        name: user.firstname
      },
      customizations: {
        title: "Travelista",
        description: "Payment for room" + theRoom.name,
        logo:
          "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg"
      },
      data: {
        ...booking,
        room: theRoom._id,
        //TODO: get the payed from the payment gate way
        payed: theRoom.price,
        roomPrice: theRoom.price,
        user: user._id
      }
    };

    setFwConfig(config);
  }

  const fwHook = useFlutterwave(myFwConfig);

  useEffect(() => {
    function getBookingDetails() {
      if (localStorage.getItem("booking")) {
        setBooking(JSON.parse(localStorage.getItem("booking")));
      }
    }

    async function getRDates() {
      const resev = await (
        await getReservedDates(
          location.search.slice(
            location.search.indexOf("id") + 3,
            location.search.length
          )
        )
      )?.data;
      setReservedDates(resev?.data);
      setLoading(false);
      if (!hasSetStarted) {
        setHasSetStarted(true);
        setBooking((pre) => {
          return { ...pre, start: getStartDate(resev.data) };
        });
      }
    }

    getRDates();
    getBookingDetails();
    console.log("updated my state", myFwConfig);
    if (myFwConfig)
      if (!hasSubmitted) {
        fwHook(fwAction);
        setHasSubmitted(true);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    location.pathname,
    cookie.meUser,
    initBooking,
    loading,
    hasSetStarted,
    myFwConfig
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div
        id="bookingForm"
        className={className || "col-lg-4 col-md-6 banner-right"}
        style={css}
      >
        <ul className={"nav nav-tabs" + tab} id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="hotel-tab"
              data-toggle="tab"
              href="#xhotel"
              role="tab"
              aria-controls="hotel"
              aria-selected="false"
            >
              Booking
            </a>
          </li>
        </ul>
        {heading && <h3 className="text-center">{heading}</h3>}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="hotel"
            role="tabpanel"
            aria-labelledby="hotel-tab"
          >
            <form onSubmit={(e) => submitForm(e)} className="form-wrap">
              <Grid container spacing={2} my="1em">
                <Grid item xs={12} sm={6} width="100%">
                  <DatePicker
                    label="Check In"
                    className="w-100"
                    disablePast={true}
                    value={booking.start}
                    renderDay={(date, selectedDay, pickerDayProp) =>
                      customDayRenderer(
                        date,
                        selectedDay,
                        pickerDayProp,
                        reservedDates
                      )
                    }
                    onChange={(e) => handleDateChange(e, "start")}
                    renderInput={(params) => <TextField {...params} />}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    className="w-100"
                    minDate={moment(booking.start).add(1, "day")}
                    label="Check Out"
                    value={booking.end}
                    renderDay={(date, selectedDay, pickerDayProp) =>
                      customDayRenderer(
                        date,
                        selectedDay,
                        pickerDayProp,
                        reservedDates
                      )
                    }
                    onChange={(e) => handleDateChange(e, "end")}
                    renderInput={(params) => <TextField {...params} />}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6} width="100%" maxWidth="100%">
                  <TextField
                    id="outlined-basic"
                    className="w-100"
                    label="Adult"
                    type="number"
                    variant="outlined"
                    name="noOfAdults"
                    onChange={handleTextChange}
                    value={booking.noOfAdults || ""}
                    inputProps={{ maxLength: 2 }}
                    disabled={loading}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6} width="100%" maxWidth="100%">
                  <TextField
                    id="outlined-basic"
                    className="w-100"
                    label="Children"
                    type="number"
                    variant="outlined"
                    name="noOfChildren"
                    onChange={handleTextChange}
                    value={booking.noOfChildren || ""}
                    inputProps={{ maxLength: 2 }}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
              <button
                type="submit"
                className="primary-btn text-uppercase"
                disabled={loading}
              >
                {hasSubmitted ? (
                  <img
                    src="/assets/img/elements/gif/gif1.gif"
                    className="img-fluid"
                    alt="loading"
                    width="50px"
                  />
                ) : (
                  "Make Payment"
                )}
              </button>
              {error.isError && (
                <div className="mt-3">
                  {console.log("err", error)}
                  <Alert
                    title={error.title}
                    message={error.message}
                    alert={error.alert}
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default BookingForm;
