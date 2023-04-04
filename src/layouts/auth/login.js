// Login
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../../components/buttons";

function Login({ switchAuth, submit }) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="form-body">
      <h1 className="h1 text-dark text-center mb-3">Login</h1>
      <form className="row px-md-5" action="#">
        <div className="col-12 mt-10">
          <TextField
            id="outlined-basic"
            className="w-100"
            label="Enter Email"
            type="email"
            variant="outlined"
            name="username"
            required
          />
        </div>
        <div className="col-12 mt-10">
          <TextField
            id="outlined-basic1"
            className="w-100"
            label="Enter password"
            type="password"
            variant="outlined"
            name="password"
            required
          />
        </div>

        <div className="col-12 mt-50 text-center">
          <Button
            type="submit"
            text={
              !submitting ? (
                "Login"
              ) : (
                <img
                  src="/assets/img/elements/gif/gif1.gif"
                  className="img-fluid"
                  alt="loading"
                  width="50px"
                />
              )
            }
            color="primary"
            shape="circle"
            size="e-large"
            onClick={(e) => {
              setSubmitting(true);
              submit(e);
            }}
          />
          <p className="text-dark">
            Don't have an account?{" "}
            <span className="text-primary cursor-pointer" onClick={switchAuth}>
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
