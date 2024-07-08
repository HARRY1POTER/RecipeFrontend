import React, { useEffect } from "react";
// import axios from "axios";
import axios from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import SignIn from "./SignIn";
import myphoto from "./Rectangle 8 (1).png";

function LogIn() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const Login = async (e) => {
    console.log(email, password);
    e.preventDefault();
    axios
      .post("/Login", { email, password })
      .then((result) => {
        console.log(result);

        if (result.data._id) {
          localStorage.setItem("user", JSON.stringify(result));
          window.location.href = "/";
          toast.success("Login Successfully");
        } else {
          toast.error("Please enter correct detail");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="frame0">
        <div className="signInContainer0">
          <form action="Log In " method="post" className="signForm0">
            <br></br>
            <h1>Log In</h1>

            {/* <p>E-mail</p> */}
            <input
              type="email"
              placeholder="E-mail"
              required
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            {/* <p>Password</p> */}
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              required
              id="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <br></br>
            <br></br>
            <button type="button" onClick={Login}>
              Submit
            </button>
            <Toaster position="top-center" reverseOrder={false} />
            <div>
              <br></br>
              <p>
                New User?
                <Link to="/SignIn" element={<SignIn />}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
          <div className="signImg0">
            <img src={myphoto} alt="img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
