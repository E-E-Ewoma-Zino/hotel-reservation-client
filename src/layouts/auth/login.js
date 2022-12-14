// Login

import Button from "../../components/buttons";
import Input from "../../components/inputs";

function Login({ switchAuth, submit }) {
	return (
		<div className="form-body">
			<h1 className="h1 text-dark text-center mb-3">Login</h1>
			<form className="row px-md-5" action="#">
				<div className="col-12 mt-10">
					<Input type="email" name="username" placeholder="Email address" onFocusText='' onBlurText="Email address" className="single-input" required={true} />
				</div>
				<div className="col-12 mt-10">
					<Input type="password" name="password" placeholder="Password" onFocusText='' onBlurText="Email address" className="single-input" required={true} />
				</div>

				<div className="col-12 mt-50 text-center">
					<Button type="submit" text="Login" color="primary" shape="circle" size="e-large" onClick={submit} />
					<p className="text-dark">Don't have an account? <span className="text-primary cursor-pointer" onClick={switchAuth}>Register</span></p>
				</div>
			</form>
		</div>
	);
}

export default Login;