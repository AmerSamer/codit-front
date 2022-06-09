import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.css";
const port = "https://codit-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        `${port}/api/auth/register`,
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authTokenCodit", data.token);
      setTimeout(() => {
        navigate('/');
      }, 1000);

      history.push("/");

    } catch (error) {
      if(error.response){
        setError(error.response.data.error);
      }else{
        setError("Invalid");
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
      
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="name">Username</label>
          <input
            type="text"
            required
            id="name"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            required
            id="confirmpassword"
            style={{marginBottom:"1.5rem"}}
            autoComplete="true"
            placeholder=""
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-btn btn btn-info">
          Register
        </button>

        {/* <span className="login-screen__subtext" style={{fontSize: "75%"}}>
          Don`t have an account? <Link to="/register" style={{color:"#138496"}}>Register</Link>
        </span> */}

        <span className="register-screen__subtext" style={{fontSize: "75%"}} >
          Already have an account? <Link to="/login" style={{color:"#138496"}} className="login-hover" >Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;