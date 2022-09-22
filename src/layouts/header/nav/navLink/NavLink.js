// Header nav link
import { Link } from "react-router-dom";

function NavLink({ url, text, className, child }) {
	return (
		<li className={className}>
			<Link to={url}>{text}</Link>
			{child && child}
		</li>
	);
}

export default NavLink;