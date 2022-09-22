// Breadcrumb

import { Link } from "react-router-dom";

function Breadcrumb({path, crumb}) {
	return (
		<>
			<span className="lnr lnr-arrow-right"></span>
			<Link to={crumb? "../" + path: '/' + path}>
				{path}
			</Link>
		</>
	)

}

export default Breadcrumb;