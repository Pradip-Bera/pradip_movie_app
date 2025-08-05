// pages/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlics.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { name, email };
    dispatch(authActions.login(userData));
    navigate("/");
  };

  return (
    <main className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Your name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
