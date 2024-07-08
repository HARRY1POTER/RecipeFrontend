import React from "react";
// import axios from "axios";
import axios from "../axiosConfig";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./SIgnIn.css";
import LogIn from "./LogIn";
import myphoto from "./Rectangle 8 (1).png";
import toast, { Toaster } from "react-hot-toast";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const Submit = async () => {
    try {
      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Client-side validation
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      // Send POST request to server
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });

      // Handle successful response
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload("/"); // Reload the page after successful registration
    } catch (error) {
      // Handle errors
      console.error(error);
      if (error.response && error.response.data.message) {
        // Server responded with an error
        toast.error(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received from server");
      } else {
        // Other errors
        console.log("Error occurred while processing request");
      }
    }
  };

  return (
    <>
      <div className="frame0">
        <div className="signInContainer0">
          {/* <h1>Register</h1> */}
          <form action="Log In " method="post" className="signForm0">
            <br></br>
            <h1>SIGN UP</h1>

            {/* <p>User Name</p> */}
            {/* <br></br> */}

            <input
              type="name"
              name="name"
              placeholder="Name"
              value={name}
              required
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>

            {/* <p>E-mail</p> */}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            {/* <p>Password</p> */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              required
              id="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            {/* <br></br> */}
            <br></br>
            <button type="button" onClick={Submit}>
              Sign In
            </button>
            <Toaster position="top-center" reverseOrder={false} />

            <div className="">
              <p>
                Already have an Account?
                <Link to="/LogIn" element={<LogIn />}>
                  Log In
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

export default SignIn;
