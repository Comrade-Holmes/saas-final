
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/login`,
  form
);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>
        <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})}/>
        <button onClick={handleLogin}>Login</button>
        <p>New user? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
