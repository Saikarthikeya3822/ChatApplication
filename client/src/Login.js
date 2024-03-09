import React, { useState, useContext } from "react";
import axios from "axios";
import { store } from "./App";
import { Navigate } from "react-router";

const Login = () => {
  const [token, setToken] = useContext(store);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("User is Not Registered please register");
        }
      });
  };

  if (token) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    onChange={changeHandler}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    onChange={changeHandler}
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="submit"
                    className="btn btn-primary w-100"
                    value="Login"
                  />
                </div>
              </form>
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
