
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiConfig from "../../config";



function Login() {
  //USER DATA GET
  const [loginData, setLoginData] = useState({ email : "", password : ""});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext( AuthContext )

  const handleChange =(e)=>{
    setLoginData({...loginData,  [e.target.name] : e.target.value });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setIsLoggedIn(true);
      const resp = await apiConfig.post("auth/login", loginData );
      console.log("show the resp... ", resp);
      if(resp.status === 200){ updateUser(resp.data.data), setIsLoggedIn(true), setError(""), navigate("/profile"); 
      }else{
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      setIsLoggedIn(false);
    }
  }
  
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" value={loginData.name}  onChange={handleChange} type="text" placeholder="Email" />
          <input name="password" value={loginData.password} onChange={handleChange} type="password" placeholder="Password" />
          <button disabled={isLoggedIn}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
