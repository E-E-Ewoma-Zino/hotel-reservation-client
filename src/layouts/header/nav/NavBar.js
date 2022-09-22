// Navbar 
import NavLink from "./navLink/NavLink";

function NavBar() {
	return (
		<div className="container main-menu">
			<div className="row align-items-center justify-content-between d-flex">
				<div id="logo">
					<a href="index.html"><img src="/assets/img/logo.png" alt="" title="" /></a>
				</div>
				<nav id="nav-menu-container">
					<ul className="nav-menu">
						<NavLink url="/home" text="Home" />
						<NavLink url="/about" text="About" />
						<NavLink url="/contact" text="Contact" />
						<NavLink url="/rooms" text="Rooms" />
						<NavLink url="/blog" text="Blog" className="menu-has-children" child={
							<ul>
								<NavLink url="/blog/home" text="Blog Home" />
								<NavLink url="/blog/single" text="Blog Single" />
							</ul>
						} />
						<NavLink url="#x" text="Pages" className="menu-has-children" child={
							<ul>
								<NavLink url="/rooms" text="Elements" />
								<NavLink url="/pages" text="Level 2" className="menu-has-children" child={
									<ul>
										<NavLink url="/rooms" text="Item One" />
										<NavLink url="/rooms" text="Item Two" />
									</ul>
								} />
							</ul>
						} />
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default NavBar;