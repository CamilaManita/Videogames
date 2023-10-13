import React from "react";
import { useState, useEffect } from "react";
import { loginValidation } from "../../Utils/Validations";

function Login({ login, response, setResponse }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors(
      loginValidation({ ...userData, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  useEffect(() => {
    setResponse("");
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <div>
            <label htmlFor="email"> Email</label>
          </div>

          <div>
            <input
              type="email"
              value={userData.email}
              placeholder="Your Email"
              onChange={handleChange}
              name="email"
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>

          <div>
            <input
              type="password"
              value={userData.password}
              placeholder="Your Password"
              onChange={handleChange}
              name="password"
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
        </div>

        <button>Enter</button>
      </form>
      {response && (
        <div className="">
          <h2>{response}</h2>
        </div>
      )}
    </div>
  );
}

export default Login;
