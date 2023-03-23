import HeroSection from "../../layouts/heroSection/HeroSection";
import "./Invoice.css";

export default function Invoice() {
	return <>
		<HeroSection name="Invoice" />

		<div className="container d-flex justify-content-center w-100">
			<div className="row d-flex justify-content-center w-100">
				<div className="col-md-6 col-md-offset-3 body-main">
					<div className="col-md-12">
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
								<h5>04854654101</h5>
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
										<td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 50,000 </td>
									</tr>
									<tr>
										<td className="col-md-9">Check Out</td>
										<td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 5,200 </td>
									</tr>
									<tr>
										<td className="col-md-9">Number of Adults</td>
										<td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 25,000 </td>
									</tr>
									<tr>
										<td className="col-md-9">Number of Children</td>
										<td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 2,200 </td>
									</tr>
									<tr>
										<td className="text-right">
											<p>
												<strong>Discount:</strong>
											</p>
										</td>
										<td>
											<p>
												<strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 0% </strong>
											</p>
										</td>
									</tr>
									<tr style={{ color: "#f8b600" }}>
										<td className="text-right"><h4><strong>Payment:</strong></h4></td>
										<td className="text-left"><h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 79,900 </strong></h4></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<div className="col-md-12">
								<p><b>Date :</b> 6 June 2019</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}