// Register

import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../../components/buttons";
import Input from "../../components/inputs";

function Register({ switchAuth, submit }) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="form-body">
      <h1 className="h1 text-dark text-center mb-3">Register</h1>
      <form className="row" action="#">
        <div className="col-6 mt-10">
          <TextField
            id="outlined-basic"
            className="w-100"
            label="First Name"
            type="email"
            variant="outlined"
            name="first_name"
            required
          />
        </div>
        <div className="col-6 mt-10">
          <TextField
            id="outlined-basic"
            className="w-100"
            label="Last Name"
            type="email"
            variant="outlined"
            name="last_name"
            required
          />
        </div>
        <div className="col-6 mt-10">
          <TextField
            id="outlined-basic"
            className="w-100"
            label="Email Address"
            type="email"
            variant="outlined"
            name="username"
            required
          />
        </div>
        <div className="col-6 mt-10">
          <TextField
            id="outlined-basic"
            className="w-100"
            label="Password"
            type="email"
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
            Already have an account?{" "}
            <span className="text-primary cursor-pointer" onClick={switchAuth}>
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
