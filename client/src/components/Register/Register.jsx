import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginValidation } from "../../Utils/Validations";
import { create } from "../../redux/actions";

function Register({ setOpenRegister, login }) {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState("");
  const [created, setCreated] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    setErrors(
      loginValidation({ ...newUser, [event.target.name]: event.target.value })
    );
  };

  const singIn = async (newUser) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/user/register`,
        newUser
      );
      setResponse(data.user);
      setUserData(newUser);
      setCreated(true);
      alert("User created");
    } catch (error) {
      setResponse(error.response.data.error);
      alert("Error in user creation");
    } finally {
      setNewUser({ ...newUser, email: "", password: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
    singIn(newUser);
  };

  const buttonDisable = (newUser, errors) => {
    let disable = false;
    if (!newUser.email || !newUser.password) disable = true;
    if (errors.email || errors.password) disable = true;
    return disable;
  };

  const handleMessage = () => {
    setResponse("");
    created && login(userData);
  };

  return (
    <div>
      {!response && (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <div>
              <label htmlFor="email">Email</label>
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={newUser.email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <div>
                <em>(6 - 30 characters and 1 number)</em>
              </div>
              <input
                type="password"
                name="password"
                value={newUser.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
          </div>
          <button type="submit" disable={buttonDisable(newUser, errors)}>
            Sing up
          </button>
          <button type="button" onClick={() => setOpenRegister(false)}>
            Already have an account?
          </button>
        </form>
      )}
      {response && (
        <div>
          <h2>{response}</h2>
          <button onClick={handleMessage}>OK</button>
        </div>
      )}
    </div>
  );
}

export default Register;
