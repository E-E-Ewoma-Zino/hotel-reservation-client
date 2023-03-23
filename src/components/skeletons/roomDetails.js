export default function RoomDetailsSkeleton() {
	return <div className="details">
		<div className="row">
			<div className="col-12 col-md-6 w-100">
				<div className="image animated pulse infinite rounded" style={{height: "20em", backgroundColor: "#ededed5c"}}></div>
			</div>
			<div className="col-12 col-md-6 d-flex align-items-center">
				<div className="description">
					<div className="heading d-flex flex-column mt-2" style={{gap: "10px"}}>
						<div className="h2 name animated pulse infinite rounded" style={{width: "170px", height: "20px", backgroundColor: "#ededed5c"}}></div>
						<div className="type text-info animated pulse infinite rounded" style={{width: "80px", height: "5px", backgroundColor: "#ededed5c"}}></div>
					</div>
					<div className="body d-flex flex-column mt-2" style={{gap: "10px"}}>
						<p className="body animated pulse infinite rounded" style={{width: "250px", height: "30px", backgroundColor: "#ededed5c"}}></p>
						<span className="features animated pulse infinite rounded" style={{width: "170px", height: "10px", backgroundColor: "#ededed5c"}}></span>
					</div>
					<div className="footer d-flex align-items-center mt-2" style={{gap: "10px"}}>
						<div className="price h4 animated pulse infinite rounded" style={{width: "70px", height: "10px", backgroundColor: "#ededed5c"}}></div>
						<div className="book-now animated pulse infinite rounded" style={{width: "170px", height: "30px", backgroundColor: "#ededed5c"}}></div>
					</div>
				</div>
			</div>
		</div>
		<div className="row my-3">
			<div className="col-12">
				<div className="img-cell d-flex" style={{gap: "20px"}}>
					<div className="animated pulse infinite rounded" style={{width: "50px", height: "50px", backgroundColor: "#ededed5c"}}></div>
					<div className="animated pulse infinite rounded" style={{width: "50px", height: "50px", backgroundColor: "#ededed5c"}}></div>
					<div className="animated pulse infinite rounded" style={{width: "50px", height: "50px", backgroundColor: "#ededed5c"}}></div>
					<div className="animated pulse infinite rounded" style={{width: "50px", height: "50px", backgroundColor: "#ededed5c"}}></div>
				</div>
			</div>
		</div>
	</div>
}