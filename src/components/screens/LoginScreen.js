import { useState, useEffect } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import "./LoginScreen.css";
// const port = "https://carpentry-production-back.herokuapp.com"
const portLocal = "http://localhost:4001"

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate('/');
      // history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${portLocal}/api/auth/login`,
        { email, password },
        config
      );

      localStorage.setItem("authTokenCodit", data.token);

      setTimeout(() => {
        navigate('/');
    }, 1000)
    
      // history.push("/");

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">
          Sign in
          {/* <h5 className="login-screen__title" style={{fontSize: "60%"}}>
          Welcome Back, Please Login To Your Account
          </h5> */}
        </h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label style={{fontFamily:"revert", fontWeight:"bold", color: "white"}} htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
          <Link to="/forgotpassword" className="login-screen__forgotpassword">
          <span style={{float: "right"}}>Forgot Password?</span>
            </Link>
        </div>
        <button type="submit" className="login-btn btn btn-info">
          Login
        </button>
        <span className="login-screen__subtext" style={{fontSize: "75%"}}>
          Don`t have an account? <Link to="/register" style={{color:"#138496"}}className="register-hover">Register</Link>
        </span>
        
        {/* <span className="login-screen__subtext">
          <Link to="/register"><span style={{color: "black"}}>Register</span></Link>
        </span> */}
      </form>
    </div>
  );
};

export default LoginScreen;