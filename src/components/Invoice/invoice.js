import moment from "moment";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import HeroSection from "../../layouts/heroSection/HeroSection";
import "./Invoice.css";

export default function Invoice() {
	const theInvoice = useLocation().state?.invoice;
	const navigate = useNavigate();
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		bodyClass: "container bg-danger",
		content: () => componentRef.current,
	});

	useEffect(() => {
		if (!theInvoice) window.swalWithBootstrapButtons.fire({
			icon: 'warning',
			title: "Nothing To see here",
			text: "You can't use this page now",
			showConfirmButton: true,
			confirmButtonText: "Back"
		}).then(() => navigate(-1));
		console.log("rending...")
	}, [theInvoice, navigate]);


	return <>
		<HeroSection name="Invoice" />

		<div className="flex justify-content-center mt-4">
			<button type="button" className="primary-btn text-uppercase" onClick={handlePrint}>Download</button>
		</div>

		<div className="container d-flex justify-content-center w-100">
			<div className="row d-flex justify-content-center w-100">
				<div className="col-md-6 col-md-offset-3 body-main">
					<div className="col-md-12" ref={componentRef}>
						<div className="row">
							<div className="col-md-4">
								<img src="/assets/img/logo.png" className="img d-inline pr-3" alt="Invoce Template" />
							</div>
							<div className="col-md-8 text-right">
								<h4 style={{ color: "#f8b600" }}><strong>Travelista</strong></h4>
								<p>8 ,Uti Street</p>
								<p>090 7482 6551</p>
								<p>Travelista@gmail.com</p>
							</div>
						</div>
						<br />
						<div className="row">
							<div className="col-md-12 text-center">
								<h2>INVOICE</h2>
								<h5>{theInvoice?._id}</h5>
							</div>
						</div>
						<br />
						<div>
							<table className="table">
								<thead>
									<tr>
										<th><h5>Details</h5></th>
										<th><h5>Value</h5></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="col-md-9">Check In</td>
										<td className="col-md-3 text-right">{moment(theInvoice?.start).format("YYYY-MM-DD")} </td>
									</tr>
									<tr>
										<td className="col-md-9">Check Out</td>
										<td className="col-md-3 text-right">{moment(theInvoice?.end).format("YYYY-MM-DD")} </td>
									</tr>
									<tr>
										<td className="col-md-9">Number of Adults</td>
										<td className="col-md-3 text-right">{theInvoice?.noOfAdults} </td>
									</tr>
									<tr>
										<td className="col-md-9">Number of Children</td>
										<td className="col-md-3 text-right">{theInvoice?.noOfChildren} </td>
									</tr>
									<tr>
										<td className="text-right">
											<p>
												<strong>Discount:</strong>
											</p>
										</td>
										<td>
											<p>
												<strong>0% </strong>
											</p>
										</td>
									</tr>
									<tr style={{ color: "#f8b600" }}>
										<td className="text-left"><h4><strong>Payment:</strong></h4></td>
										<td className="text-right"><h4><strong>₦{theInvoice?.flutterWave?.amount} </strong></h4></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<div className="col-md-12">
								<p><b>Date :</b> {moment(theInvoice?.createdAt).format("YYYY-MM-DD")}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}