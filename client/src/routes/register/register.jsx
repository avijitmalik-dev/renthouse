
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiConfig from "../../config";


function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const resp = await apiConfig.post("/auth/register", formData );
      navigate('/login');
    } catch (error) {
      setError(error.respone.data.message);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Username" />
          <input name="email" value={formData.email} onChange={handleChange} type="text" placeholder="Email" />
          <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" />
          <button type="submit">Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
