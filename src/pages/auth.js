// auth for users
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logInUser, registerUser } from "../api/post";
import Alert from "../components/alert";
import Login from "../layouts/auth/login";
import Register from "../layouts/auth/register";
import HeroSection from "../layouts/heroSection/HeroSection";
import PopularPosts from "../layouts/popularPosts/popularPosts";

function Auth() {
	const navigate = useNavigate();
	const location = useLocation();
	const prevPath = location.state.prevPath || '/';

	const [hasAccount, setHasAccount] = useState(true);
	const [error, setError] = useState({
		isError: false,
		message: "",
		title: "",
		alert: ""
	});

	function handleSwitch() {
		setHasAccount(!hasAccount);
	}

	console.log("navigate", prevPath);


	function handelSubmit(event) {
		const form = event.target.parentElement.parentElement;

		form.onsubmit = async (e) => {
			e.preventDefault();

			if (hasAccount) {
				const data = {
					username: form[0].value,
					password: form[1].value
				}

				try {
					const hasLogedIn = await logInUser(data);

					if (hasLogedIn.data.isLogedIn) {
						window.localStorage.setItem("user", JSON.stringify(hasLogedIn.data.data));
						navigate(prevPath);
					}
				} catch (err) {
					console.error("Error on submit", err);
					setError({
						isError: true,
						message: err.response.data.message,
						title: err.response.data.err,
						alert: err.response.data.alert
					});
				}
			} else {
				const data = {
					firstname: form[0].value,
					lastname: form[1].value,
					username: form[2].value,
					password: form[3].value
				}

				try {
					const hasRegister = await registerUser(data);

					if (hasRegister.data.isLogedIn) {
						window.localStorage.setItem("user", JSON.stringify(hasRegister.data.data));
						navigate(prevPath);
					}
				} catch (err) {
					console.error("error on submit", err);
					setError({
						isError: true,
						message: err.response.data.message,
						title: err.response.data.err,
						alert: err.response.data.alert
					});
				}
			}
		}
	}

	return (
		<>
			<HeroSection name="Auth" />
			<div className="container my-5em">
				<div className="row">
					<div className="col-12 col-md-8">
						{
							hasAccount ? <Login switchAuth={handleSwitch} submit={handelSubmit} /> : <Register switchAuth={handleSwitch} submit={handelSubmit} />
						}
						{
							error.isError &&
							<div className="mt-3">
								<Alert title={error.title} message={error.message} alert={error.alert} />
							</div>
						}
					</div>
					<div className="col-md-4 d-none d-md-block">
						<div className="widget-wrap radius-10">
							<PopularPosts />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Auth;