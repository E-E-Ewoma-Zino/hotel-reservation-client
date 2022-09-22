// Register

import Button from "../../components/buttons";
import Input from "../../components/inputs";

function Register({ switchAuth, submit }) {
	return (
		<div className="form-body">
			<h1 className="h1 text-dark text-center mb-3">Register</h1>
			<form className="row" action="#">
				<div className="col-6 mt-10">
					<Input type="text" name="first_name" placeholder="First Name" onFocusText='' onBlurText="First Name" required className="single-input" />
				</div>
				<div className="col-6 mt-10">
					<Input type="text" name="last_name" placeholder="Last Name" onFocusText='' onBlurText="Last Name" required className="single-input" />
				</div>
				<div className="col-6 mt-10">
					<Input type="email" name="username" placeholder="Email address" onFocusText='' onBlurText="Email address" required className="single-input" />
				</div>
				<div className="col-6 mt-10">
					<Input type="password" name="password" placeholder="Password" onFocusText='' onBlurText="Email address" required className="single-input" />
				</div>

				<div className="col-12 mt-50 text-center">
					<Button type="submit" text="Login" color="primary" shape="circle" size="e-large" onClick={submit} />
					<p className="text-dark">Already have an account? <span className="text-primary cursor-pointer" onClick={switchAuth}>Login</span></p>
				</div>
			</form>
		</div>
	);
}

export default Register;